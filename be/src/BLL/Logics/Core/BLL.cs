using AutoMapper;
using DAL.DataAccess.Core;

namespace BLL.Logics.Core;

public interface IBLL
{
    Points Points { get; }
    Properties Properties { get; }
}

public class BLL : IBLL
{
    private protected readonly IDAL _dal;
    private protected readonly IMapper _mapper;

    public BLL(IDAL dal, IMapper mapper)
    {
        _mapper = mapper;
        _dal = dal;
    }
    private Points _points;
    public Points Points => _points ??= new Points(this, _mapper, _dal.PointsDataAccess);

    private Properties _properties;
    public Properties Properties => _properties ??= new Properties(this, _mapper, _dal.PropertiesDataAccess);

}