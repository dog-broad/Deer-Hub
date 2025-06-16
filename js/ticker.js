$(function() {
  const ticker = $("#news-ticker");
  if (!ticker.length) return;

  $.getJSON("/data/announcements.json", function(data) {
    if (!data || !data.length) {
      ticker.text("No announcements.");
      return;
    }

    // Build ticker content
    let content = "";
    data.forEach(function(ann, index) {
      content += `<span class='me-4'><strong>${ann.date}:</strong> ${ann.msg}</span>`;
    });

    ticker.html(`<div class='ticker-wrapper'>${content}</div>`);

    // Scroll effect
    const wrapper = ticker.find('.ticker-wrapper');
    let tickerWidth = wrapper.width();
    let parentWidth = ticker.width();
    let left = parentWidth;

    function scrollTicker() {
      left--;
      if (-left >= tickerWidth) left = parentWidth;
      wrapper.css('transform', `translateX(${left}px)`);
    }

    let interval = setInterval(scrollTicker, 20);

    ticker.hover(
      function() { clearInterval(interval); },
      function() {
        interval = setInterval(scrollTicker, 20);
      }
    );
  });
});
