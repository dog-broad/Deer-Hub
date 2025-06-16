$(function() {
  const ticker = $("#news-ticker");
  if (!ticker.length) return;
  $.getJSON("/data/announcements.json", function(data) {
    if (!data || !data.length) {
      ticker.text("No announcements.");
      return;
    }
    let idx = 0;
    function showAnnouncement(i) {
      const ann = data[i];
      ticker.fadeOut(250, function() {
        ticker.html(`<span class='fw-bold me-2'>${ann.date}:</span> ${ann.msg}`);
        ticker.fadeIn(350);
      });
    }
    showAnnouncement(idx);
    let interval = setInterval(function() {
      idx = (idx + 1) % data.length;
      showAnnouncement(idx);
    }, 3500);
    ticker.hover(
      function() { clearInterval(interval); },
      function() {
        interval = setInterval(function() {
          idx = (idx + 1) % data.length;
          showAnnouncement(idx);
        }, 3500);
      }
    );
  });
}); 