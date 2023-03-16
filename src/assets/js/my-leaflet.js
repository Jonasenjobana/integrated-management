(function () {
  const TitleCanvas = L.Layer.extend({
    _map: {},
    _canvas: undefined,
    _context: {},
    _titles: undefined, // {point: [number, number], name: string}
    initialize: function (titles, options) {
      L.setOptions(this, options);
      this._titles = titles
    },
    onAdd: function (map) {
      this._map = map;
      if (!this._canvas) this.initCanvas();
      this._map.on('moveend', this.reset, this);
      this._map.on('resize', this.reset, this);
      if (map.options.zoomAnimation && L.Browser.any3d) {
        /**缩放动画 */
        map.on('zoomanim', this._animateZoom, this);
      }
      this.reset();
    },
    updateTitle(title) {
      console.log('update', this._titles)
      this._titles = title
      this.reset()
    },
    onRemove: function (map) {
      if (this.options.pane) {
        this.getPane()?.removeChild(this._canvas)
      } else {
        map.getPanes().overlayPane.removeChild(this._canvas)
      }
      map.off('moveend', this.reset, this)
      map.off('resize', this.reset, this)
      if (map.options.zoomAnimation) {
        map.off('zoomanim', this._animateZoom, this)
      }
      if (this.animationLoop) cancelAnimationFrame(this.animationLoop)
      return this
    },
    _animateZoom(e) {
      let map = this._map;
      var scale = map.getZoomScale(e.zoom),
        offset = map
          ._getCenterOffset(e.center)
          ._multiplyBy(-scale)
          .subtract(map._getMapPanePos());
      L.DomUtil.setTransform(this._canvas, offset, scale);
    },
    reset: function () {
      // 重新获取画布大小
      const topLeft = this._map.containerPointToLayerPoint([0, 0]);
      // L.DomUtil.setPosition(this._canvas, topLeft);
      var size = this._map.getSize();
      this._canvas.width = size.x;
      this._canvas.height = size.y;
      if (this._titles.length !== 0) this._redraw();
    },
    _redraw: function () {
      console.log('redraw', this._canvas.width, this._canvas.height)
      this._clearContext();
      this._titles.forEach(el => {
        this.drawName(el.name, this._map.latLngToContainerPoint(el.point));
      })
    },
    drawName(areaName, point) {
      const ctx = this._context;
      const zoom = this._map.getZoom();
      if (!areaName || zoom < 10) return;
      ctx.save();
      ctx.beginPath();
      ctx.font = '14px "微软雅黑"';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = 1;
      ctx.fillText(areaName, point.x, point.y + 16);
      ctx.stroke();
      ctx.restore();
    },
    _clearContext: function () {
      let map = this._map;
      if (L.Browser.canvas && map) {
        let ctx = this._context,
          ww = this._canvas.width,
          hh = this._canvas.height;
        ctx.clearRect(0, 0, ww, hh); // 清空画布
        return true;
      }
      return false;
    },
    initCanvas: function () {
      this._canvas = L.DomUtil.create('canvas', 'my-canvas', this.getPane());
      const originProp =
        '' +
        L.DomUtil.testProp([
          'transformOrigin',
          'WebkitTransformOrigin',
          'msTransformOrigin',
        ]);
        // 画布中心
      this._canvas.style[originProp] = '50% 50%';
      this._context = this._canvas.getContext('2d');
    },
  });
  window.TitleCanvas = function (titles, options) {
    return new TitleCanvas(titles, options);
  };
}());

