
using CardioTrustAI.Application.Recordings;

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CardioTrustAI.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public sealed class RecordingsController : ControllerBase
{
    private readonly ISender _sender;

    public RecordingsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateRecordingCommand command,
        CancellationToken cancellationToken)
    {
        var recording = await _sender.Send(
            command,
            cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = recording.Id },
            recording);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        CancellationToken cancellationToken)
    {
        var recordings = await _sender.Send(
            new GetAllRecordingsQuery(),
            cancellationToken);

        return Ok(recordings);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var recording = await _sender.Send(
            new GetRecordingByIdQuery(id),
            cancellationToken);

        return recording is null
            ? NotFound()
            : Ok(recording);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UpdateRecordingCommand command,
        CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest(new
            {
                message = "Route ID and request ID must match."
            });
        }

        var recording = await _sender.Send(
            command,
            cancellationToken);

        return recording is null
            ? NotFound()
            : Ok(recording);
    }

    // [HttpDelete("{id:guid}")]
    // public async Task<IActionResult> Delete(
    //     Guid id,
    //     CancellationToken cancellationToken)
    // {
    //     var deleted = await _sender.Send(
    //         new DeleteRecordingCommand(id),
    //         cancellationToken);

    //     return deleted
    //         ? NoContent()
    //         : NotFound();
    // }
}
