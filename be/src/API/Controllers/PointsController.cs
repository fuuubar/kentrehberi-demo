using Microsoft.AspNetCore.Mvc;
using DTO.Results;
using BLL.Logics;
using BLL.Logics.Core;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PointsController : ControllerBase
{
    private readonly ILogger<RsPoints> _logger;
    private readonly Points _points;

    public PointsController(ILogger<RsPoints> logger, IBLL bll)
    {
        _logger = logger;
        _points = bll.Points;
    }

    [HttpGet]
    public IEnumerable<RsPoints> Get()
    {
        return _points.Get();
    }
}
