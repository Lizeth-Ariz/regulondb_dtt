import React, { Component } from "react";
import { IconButton, Button } from "../../ui-components/index";
import Feature from "../../tools/dnaFeaturesElements2/Features";
import DrawingTracesTool from "../../tools/drawingTracesTool/drawing_traces_tool";
import Panzoom from "@panzoom/panzoom";
import { ReImg } from "reimg";
//import { pointer } from "d3";

class DttGraphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_canvas: this.props.id_canvas,
      instance: null
    };
  }

  componentDidMount() {
    //console.log("panzoom aqui");
    const element = document.getElementById(
      `divCanvas_${this.state.id_canvas}`
    );
    if (element) {
      const instance = Panzoom(element);
      this.setState({ instance: instance });
    }
  }

  _onZoomIN = () => {
    const panzoom = this.state.instance;
    if (panzoom) {
      panzoom.zoomIn();
    }
  };
  _onZoomOUT = () => {
    const panzoom = this.state.instance;
    if (panzoom) {
      panzoom.zoomOut();
    }
  };
  _onZoomReset = () => {
    const panzoom = this.state.instance;
    if (panzoom) {
      panzoom.reset();
    }
  };
  show_hide() {
    var click = document.getElementById("download");
    //if (click.style.display === "none") {
    if (click.style.display === "none" || click.style.display === "") {
      click.style.display = "block";
    } else {
      click.style.display = "none";
    }
  }
  _downloadPNG = () => {
    var svgElement = document.querySelector(`svg`);
    ReImg.fromSvg(svgElement).toCanvas(function (canvas) {
      var url = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = "dttgraphic.png";
      link.href = url;
      link.click();
    });
  };

  _downloadSVG() {
    const svg = document.getElementById(`divCanvas_${this.state.id_canvas}`)
      .innerHTML;
    const blob = new Blob([svg.toString()]);
    const element = document.createElement("a");
    element.download = "dttgraphic.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  }


  render() {
    const { dnaFeatures_data } = this.props;
    const { id_canvas } = this.state;
    const FEATURES = new Feature("id_dnaDraw", dnaFeatures_data, "test");
    //console.log(dnaFeatures_data);

    return (
      <div className="container">
        <table>
          <caption>
            <h1>DTT Results</h1>
          </caption>
          <tbody>
            <tr>
              <th>
                <IconButton
                  icon="add"
                  style={{
                    background: "#000",
                    float: "left",
                    marginRight: "1%"
                  }}
                  onClick={() => {
                    this._onZoomIN();
                  }}
                />

                <IconButton
                  icon="remove"
                  style={{
                    background: "#000",
                    float: "left",
                    marginRight: "1%"
                  }}
                  onClick={() => {
                    this._onZoomOUT();
                  }}
                />
                <IconButton
                  icon="crop_free"
                  style={{
                    background: "#000",
                    float: "left",
                    marginRight: "1%"
                  }}
                  onClick={() => {
                    this._onZoomReset();
                  }}
                />
                <div style={{ float: "right" }}>
                  <IconButton
                    id="download-btn"
                    icon="
                  cloud_download"
                    style={{
                      background: "#000",
                      float: "right",
                      marginRight: "1%"
                    }}
                    onClick={() => {
                      this.show_hide();
                    }}
                  />
                  <div
                    id="download"
                    className="list-download"
                    style={{ marginRight: "1%" }}
                  >
                    <Button
                      style={{ background: "#72a7c7" }}
                      label="Save to PNG"
                      onClick={() => {
                        this._downloadPNG();
                      }}
                    />
                    <Button
                      style={{ background: "#72a7c7" }}
                      label="Save to SVG"
                      onClick={() => {
                        this._downloadSVG();
                      }}
                    />
                  </div>
                </div>
                <a
                  style={{
                    float: "right",
                    marginRight: "1%",
                    marginTop: "1%"
                  }}
                  href="./CodeColors"
                >
                  Help
                </a>
              </th>
            </tr>
            <tr>
              <td>
                <div>
                  <div style={{overflow: "auto"}} id={`divCanvas_${id_canvas}`}>
                    {
                     //FEATURES.draw(`divCanvas_${id_canvas}`, "id_canvas")
                    }
                    {
                      //console.log("Hola3")
                      DrawingTracesTool(`divCanvas_${id_canvas}`,"id_canvas_02",dnaFeatures_data,"result")
                    }
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DttGraphic;
