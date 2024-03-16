(function () {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var InnerBlocks = wp.blockEditor.InnerBlocks;

  registerBlockType("custom/carousel-slider", {
    title: "Carousel Slider",
    icon: "format-gallery",
    category: "common",
    attributes: {
      images: {
        type: "array",
        default: [],
      },
    },
    edit: function (props) {
      var images = props.attributes.images;

      var onSelectImage = function (media) {
        var newImages = media.map(function (image) {
          return { src: image.url, alt: image.alt };
        });

        props.setAttributes({
          images: [...images, ...newImages],
        });
      };

      return el(
        "div",
        { className: "carousel-slider" },
        el(MediaUpload, {
          onSelect: onSelectImage,
          allowedTypes: "image",
          multiple: true,
          gallery: true,
          render: function (obj) {
            return el(
              "button",
              {
                className: "button button-large",
                onClick: obj.open,
              },
              "Select Images"
            );
          },
        }),
        el(InnerBlocks, { allowedBlocks: [], template: [] })
      );
    },
    save: function (props) {
      var images = props.attributes.images;
      return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {images.map((image, index) => (
              <div className={index == 0 ? "carousel-item active" : "carousel-item"}>
                <img className="d-block w-100" src="{image.src}"></img>
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      );
    },
  });
})();
