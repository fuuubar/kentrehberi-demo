using AutoMapper;
using DAL.DataAccess.Core;
using DAL.Entities;

namespace DAL.DataAccess;

public class PropertiesDataAccess : BaseDataAccess<Properties>
{
    public PropertiesDataAccess(IMapper mapper) : base(mapper) { }
    public IQueryable<Properties> ReadJsonFile()
    {
        IQueryable<Properties> features = base.ReadGeoJsonFile("/Data/yapilar.json");
        return features;
    }
}