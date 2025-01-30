import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapRef = useRef<mapboxgl.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = mapboxToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    mapRef?.current?.on("load", () => {
      mapRef?.current?.addSource("raster-array-source", {
        type: "raster-array",
        // Replace this URL with a 'mapbox://TILESET_ID'
        url: "mapbox://mapbox.gfs-winds",
        // url: "mapbox://bowline.0123_12_000_to_006-grib2",
        tileSize: 512,
      });
      mapRef?.current?.addLayer({
        id: "wind-layer",
        type: "raster",
        source: "raster-array-source",
        "source-layer": "10winds",
        paint: {
          "raster-color-range": [204, 323],
          "raster-array-band": "3",
          "raster-color": [
            "interpolate",
            ["linear"],
            ["raster-value"],
            204,
            "#50509B",
            266,
            "#FAFAA0",
            323,
            "#96053C",
          ],
          "raster-resampling": "nearest",
        },
      });
      mapRef?.current?.addLayer({
        id: "wind-layer",
        type: "raster-particle",
        source: "raster-array-source",
        "source-layer": "10winds",
        paint: {
          "raster-particle-speed-factor": 0.4,
          "raster-particle-fade-opacity-factor": 0.9,
          "raster-particle-reset-rate-factor": 0.4,
          "raster-particle-count": 4000,
          "raster-particle-max-speed": 40,
          "raster-particle-color": [
            "interpolate",
            ["linear"],
            ["raster-particle-speed"],
            1.5,
            "rgba(134,163,171,256)",
            2.5,
            "rgba(126,152,188,256)",
            4.12,
            "rgba(110,143,208,256)",
            4.63,
            "rgba(110,143,208,256)",
            6.17,
            "rgba(15,147,167,256)",
            7.72,
            "rgba(15,147,167,256)",
            9.26,
            "rgba(57,163,57,256)",
            10.29,
            "rgba(57,163,57,256)",
            11.83,
            "rgba(194,134,62,256)",
            13.37,
            "rgba(194,134,63,256)",
            14.92,
            "rgba(200,66,13,256)",
            16.46,
            "rgba(200,66,13,256)",
            18.0,
            "rgba(210,0,50,256)",
            20.06,
            "rgba(215,0,50,256)",
            21.6,
            "rgba(175,80,136,256)",
            23.66,
            "rgba(175,80,136,256)",
            25.21,
            "rgba(117,74,147,256)",
            27.78,
            "rgba(117,74,147,256)",
            29.32,
            "rgba(68,105,141,256)",
            31.89,
            "rgba(68,105,141,256)",
            33.44,
            "rgba(194,251,119,256)",
            42.18,
            "rgba(194,251,119,256)",
            43.72,
            "rgba(241,255,109,256)",
            48.87,
            "rgba(241,255,109,256)",
            50.41,
            "rgba(256,256,256,256)",
            57.61,
            "rgba(256,256,256,256)",
            59.16,
            "rgba(0,256,256,256)",
            68.93,
            "rgba(0,256,256,256)",
            69.44,
            "rgba(256,37,256,256)",
          ],
        },
      });
    });
    // mapRef?.current?.addSource("custom-raster", {
    //   type: "raster-array",
    //   // Replace this URL with a 'mapbox://TILESET_ID'
    //   url: "mapbox://tileset-source/bowline/0123_12_000_to_006-grib2",
    //   tileSize: 512,
    // });
    // mapRef?.current?.addLayer({
    //   id: "wind-layer",
    //   type: "raster-particle",
    //   source: "custom-raster",
    //   "source-layer": "custom-raster",
    //   paint: {
    //     "raster-particle-speed-factor": 0.4,
    //     "raster-particle-fade-opacity-factor": 0.9,
    //     "raster-particle-reset-rate-factor": 0.4,
    //     "raster-particle-count": 4000,
    //     "raster-particle-max-speed": 40,
    //     "raster-particle-color": [
    //       "interpolate",
    //       ["linear"],
    //       ["raster-particle-speed"],
    //       1.5,
    //       "rgba(134,163,171,256)",
    //       2.5,
    //       "rgba(126,152,188,256)",
    //       4.12,
    //       "rgba(110,143,208,256)",
    //       4.63,
    //       "rgba(110,143,208,256)",
    //       6.17,
    //       "rgba(15,147,167,256)",
    //       7.72,
    //       "rgba(15,147,167,256)",
    //       9.26,
    //       "rgba(57,163,57,256)",
    //       10.29,
    //       "rgba(57,163,57,256)",
    //       11.83,
    //       "rgba(194,134,62,256)",
    //       13.37,
    //       "rgba(194,134,63,256)",
    //       14.92,
    //       "rgba(200,66,13,256)",
    //       16.46,
    //       "rgba(200,66,13,256)",
    //       18.0,
    //       "rgba(210,0,50,256)",
    //       20.06,
    //       "rgba(215,0,50,256)",
    //       21.6,
    //       "rgba(175,80,136,256)",
    //       23.66,
    //       "rgba(175,80,136,256)",
    //       25.21,
    //       "rgba(117,74,147,256)",
    //       27.78,
    //       "rgba(117,74,147,256)",
    //       29.32,
    //       "rgba(68,105,141,256)",
    //       31.89,
    //       "rgba(68,105,141,256)",
    //       33.44,
    //       "rgba(194,251,119,256)",
    //       42.18,
    //       "rgba(194,251,119,256)",
    //       43.72,
    //       "rgba(241,255,109,256)",
    //       48.87,
    //       "rgba(241,255,109,256)",
    //       50.41,
    //       "rgba(256,256,256,256)",
    //       57.61,
    //       "rgba(256,256,256,256)",
    //       59.16,
    //       "rgba(0,256,256,256)",
    //       68.93,
    //       "rgba(0,256,256,256)",
    //       69.44,
    //       "rgba(256,37,256,256)",
    //     ],
    //   },
    // });
    // });

    // add log if load data is complete
    mapRef?.current?.on("load", ({ target }) => {
      console.log("load data is complete", target);
    });

    return () => {
      mapRef?.current?.remove();
    };
  }, []);

  return (
    <div>
      <div>
        <button
          onClick={() =>
            mapRef?.current?.addSource("custom-raster", {
              type: "raster-array",
              // Replace this URL with a 'mapbox://TILESET_ID'
              url: "mapbox://bowline.0123_12_000_to_006-grib2",
              tileSize: 512,
            })
          }
        >
          Add Source
        </button>
      </div>
      <div
        className="w-full h-screen p-8 bg-gray-100 text-white"
        ref={mapContainerRef}
        id="map-container"
      />
    </div>
  );
};

export default MapComponent;
