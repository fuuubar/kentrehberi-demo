using Microsoft.AspNetCore.Mvc;
using DTO.Results;
using BLL.Logics;
using BLL.Logics.Core;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly ILogger<RsProperties> _logger;
    private readonly Properties _properties;

    public PropertiesController(ILogger<RsProperties> logger, IBLL bll)
    {
        _logger = logger;
        _properties = bll.Properties;
    }

    [HttpGet]
    public IEnumerable<RsProperties> Get([FromQuery]string? extent)
    {
        return _properties.Get(extent);
    }
}
