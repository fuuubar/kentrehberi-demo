using AutoMapper;
using BLL.Logics.Core;
using DAL.DataAccess;
using DTO.Results;

namespace BLL.Logics;

public class Points : BaseLogics
{
    private protected readonly PointsDataAccess _pointsDataAccess;
    public Points(IBLL bll, IMapper mapper, PointsDataAccess pointsDataAccess) : base(bll, mapper)
    {
        _pointsDataAccess = pointsDataAccess;
    }

    public IQueryable<RsPoints> Get()
    {
        IQueryable<DAL.Entities.Points> data = _pointsDataAccess.ReadJsonFile()
                                                    .Where(i => i.attributes.geo_durum == true);
        IQueryable<RsPoints> result = _mapper.ProjectTo<RsPoints>(data);
        return result;
    }
}