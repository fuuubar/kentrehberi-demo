using AutoMapper;
using DAL.DataAccess.Core;
using DAL.Entities;

namespace DAL.DataAccess;

public class PointsDataAccess : BaseDataAccess<Points>
{
    public PointsDataAccess(IMapper mapper) : base(mapper) { }

    public IQueryable<Points> ReadJsonFile()
    {
        IQueryable<Points> features = base.ReadGeoJsonFile("/Data/kentrehberi_poi.json");
        return features;
    }
}