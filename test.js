describe("escapeHtml function", function() {
  it("should escape < and >", function() {
    expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
  });
});