using AutoMapper;

namespace DAL.DataAccess.Core;


public interface IDAL
{
    PointsDataAccess PointsDataAccess { get; }
    PropertiesDataAccess PropertiesDataAccess { get; }
}

public class DAL : IDAL
{
    private protected readonly IMapper _mapper;
    public DAL(IMapper mapper)
    {
        _mapper = mapper;
    }

    private PointsDataAccess _pointsDataAccess;
    public PointsDataAccess PointsDataAccess => _pointsDataAccess ??= new PointsDataAccess(_mapper);

    private PropertiesDataAccess _propertiesDataAccess;
    public PropertiesDataAccess PropertiesDataAccess => _propertiesDataAccess ??= new PropertiesDataAccess(_mapper);

}
