$(function () {
  const ticker = $("#news-ticker");
  if (!ticker.length) return;

  $.getJSON("/data/announcements.json", function (data) {
    if (!data || !data.length) {
      ticker.text("No announcements.");
      return;
    }

    // Build the announcement content
    let content = "";
    data.forEach(function (ann) {
      content += `<span class='me-4'><strong>${ann.date}:</strong> ${ann.msg}</span>`;
    });

    // Duplicate content for seamless scrolling
    const duplicatedContent = content + content;

    // Insert duplicated content
    ticker.html(`<div class='ticker-wrapper d-inline-block white-space-nowrap'>${duplicatedContent}</div>`);

    const wrapper = ticker.find('.ticker-wrapper');
    let position = 0;

    function scrollTicker() {
      position--;
      // Reset position when half the content has scrolled (since it's duplicated)
      if (Math.abs(position) >= wrapper.width() / 2) {
        position = 0;
      }
      wrapper.css('transform', `translateX(${position}px)`);
    }

    let interval = setInterval(scrollTicker, 20);

    // Pause on hover
    ticker.hover(
      function () { clearInterval(interval); },
      function () { interval = setInterval(scrollTicker, 20); }
    );
  });
});
