using AutoMapper;
using System.Reflection;
using NetTopologySuite.Features;
using NetTopologySuite.IO;
using Newtonsoft.Json.Linq;
using DAL.Entities.Core;

namespace DAL.DataAccess.Core;

public class BaseDataAccess<T> where T : BaseGeoEntity, new()
{
    internal protected readonly IMapper _mapper;
    protected BaseDataAccess(IMapper mapper)
    {
        _mapper = mapper;
    }

    internal protected IQueryable<T> ReadGeoJsonFile(string relativePath)
    {

        string? assemblyLocation = Assembly.GetExecutingAssembly().Location;
        string? assemblyPath = Path.GetDirectoryName(assemblyLocation);

        if (assemblyPath == null)
        {
            throw new Exception("Assembly path is null value");
        }

        relativePath = relativePath.Replace('\\', '/').TrimStart('/');
        string fileFullPath = Path.Combine(assemblyPath, relativePath);

        if (File.Exists(fileFullPath) == false)
        {
            throw new FileNotFoundException("File not found on this path:" + fileFullPath);
        }

        string rawContent = File.ReadAllText(fileFullPath);

        if (IsValidJson(rawContent) == false)
        {
            throw new ArgumentException("Not a valid JSON");
        }

        GeoJsonReader reader = new GeoJsonReader();
        FeatureCollection featureCollection = reader.Read<FeatureCollection>(rawContent);
        IQueryable<T> result = _mapper.ProjectTo<T>(featureCollection.AsQueryable());
        return result;
    }

    private static bool IsValidJson(string jsonString)
    {
        try
        {
            if (String.IsNullOrWhiteSpace(jsonString))
            {
                return false;
            }
            JToken.Parse(jsonString);
            return true;
        }
        catch
        {
            return false;
        }
    }
}