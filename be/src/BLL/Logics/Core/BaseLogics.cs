using AutoMapper;

namespace BLL.Logics.Core;

public class BaseLogics
{
    internal protected readonly IBLL _bll;
    internal protected readonly IMapper _mapper;

    public BaseLogics(IBLL bll, IMapper mapper)
    {
        _mapper = mapper;
        _bll = bll;
    }
}