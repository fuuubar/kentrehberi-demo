using AutoMapper;
using DAL.Entities.Core;
using DTO.Results.Core;
using GeoAPI.CoordinateSystems.Transformations;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using ProjNet.CoordinateSystems;
using ProjNet.CoordinateSystems.Transformations;

namespace DAL.Mapping.Core;

public class BaseGeoMappingProfile<TEntity, TResult, TAttributes> : Profile
        where TEntity : BaseGeoEntity
        where TResult : RsGeoBase
        where TAttributes : BaseAttributes
{
    private static readonly WKTWriter wktWriter = new WKTWriter();
    private static readonly CoordinateTransformationFactory ctFactory = new CoordinateTransformationFactory();
    private static Geometry TransformGeometry(Geometry geometry, IMathTransform transformer)
    {
        Geometry newGeometry = geometry.Copy();
        for (int i = 0; i < geometry.Coordinates.Length; i++)
        {
            double[] transformedCoord = transformer.Transform(new[] { geometry.Coordinates[i].X, geometry.Coordinates[i].Y });
            newGeometry.Coordinates[i].X = transformedCoord[0];
            newGeometry.Coordinates[i].Y = transformedCoord[1];
        }
        return newGeometry;
    }
    internal static string GetWktString(Geometry geometry)
    {
        if (geometry.SRID != 3857)
        {
            if (geometry.SRID == 4326)
            {
                IMathTransform transformer = ctFactory.CreateFromCoordinateSystems(
                    GeographicCoordinateSystem.WGS84,
                    ProjectedCoordinateSystem.WebMercator
                ).MathTransform;
                Geometry newGeometry = TransformGeometry(geometry, transformer);
                return wktWriter.Write(newGeometry);
            }
            else
            {
                throw new NotImplementedException("Only 4326 to 3857 transformation implemented");
            }
        }
        return wktWriter.Write(geometry);
    }

    private static TAttributes GetAttributes(IAttributesTable srcAttributes)
    {
        Dictionary<string, object> attributesDictionary = new Dictionary<string, object>();
        foreach (var entry in srcAttributes.GetNames())
        {
            attributesDictionary.Add(entry, srcAttributes[entry]);
        }
        string jsonObject = JsonConvert.SerializeObject(attributesDictionary);
        return JsonConvert.DeserializeObject<TAttributes>(jsonObject);
    }

    public BaseGeoMappingProfile()
    {
        SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
        DestinationMemberNamingConvention = new PascalCaseNamingConvention();
        CreateMap<IFeature, TEntity>()
            .ForMember(dest => dest.attributes, opt => opt.MapFrom(src => GetAttributes(src.Attributes)));
    }
}
