// Taken from Node source, deps/v8/src/messages.js
//
// node: 0.10.25
// v8: 3.14.5.9

exports.FormatStackTrace = FormatStackTrace;

function FormatStackTrace(error, frames) {
  var lines = [];
  try {
    lines.push(error.toString());
  } catch (e) {
    try {
      lines.push("<error: " + e + ">");
    } catch (ee) {
      lines.push("<error>");
    }
  }
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var line;
    try {
      line = frame.toString();
    } catch (e) {
      try {
        line = "<error: " + e + ">";
      } catch (ee) {
        // Any code that reaches this point is seriously nasty!
        line = "<error>";
      }
    }
    lines.push("    at " + line);
  }
  return lines.join("\n");
}
