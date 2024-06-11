using NetTopologySuite.Geometries;

namespace DAL.Entities.Core;

public class BaseGeoEntity
{
    public Geometry geometry { get; set; }
    public BaseAttributes attributes { get; set; }

}

public class BaseAttributes
{
    public string id { get; set; }
}