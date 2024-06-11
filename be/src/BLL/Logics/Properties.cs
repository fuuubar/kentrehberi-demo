using AutoMapper;
using BLL.Logics.Core;
using DAL.DataAccess;
using DTO.Results;
using NetTopologySuite.Geometries;

namespace BLL.Logics;

public class Properties : BaseLogics
{
    private protected readonly PropertiesDataAccess _propertiesDataAccess;
    public Properties(IBLL bll, IMapper mapper, PropertiesDataAccess propertiesDataAccess) : base(bll, mapper)
    {
        _propertiesDataAccess = propertiesDataAccess;
    }

    public IQueryable<RsProperties> Get(string? extent)
    {
        IQueryable<DAL.Entities.Properties> data = _propertiesDataAccess.ReadJsonFile()
                                                    .Where(i => i.attributes.geo_durum == true);
        if (extent != null)
        {
            double[] bbox = extent.Split(',').Select(double.Parse).ToArray();
            Envelope envelope = new Envelope(bbox[0], bbox[1], bbox[2], bbox[3]);
            Polygon poly = CreatePolygon(envelope);
            data = data.Where(i => i.geometry.Intersects(poly));
        }
        IQueryable<RsProperties> result = _mapper.ProjectTo<RsProperties>(data);
        return result;
    }

    private Polygon CreatePolygon(Envelope envelope)
    {
        GeometryFactory geometryFactory = new GeometryFactory();
        Coordinate[] coordinates = new Coordinate[]
        {
            new Coordinate(envelope.MinX, envelope.MinY),
            new Coordinate(envelope.MinX, envelope.MaxY),
            new Coordinate(envelope.MaxX, envelope.MaxY),
            new Coordinate(envelope.MaxX, envelope.MinY),
            new Coordinate(envelope.MinX, envelope.MinY)
        };
        LinearRing linearRing = geometryFactory.CreateLinearRing(coordinates);
        Polygon polygon = geometryFactory.CreatePolygon(linearRing);
        return polygon;
    }
}