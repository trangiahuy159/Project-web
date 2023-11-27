import React, { Component } from "react";
import { Typography } from "@mui/material";

class Home extends Component {
  render() {
    return (
      <div className="align-center">
        <Typography variant="h4" component="h2" align="center">
          ADMIN HOME
        </Typography>
        <div
          style={{
            width: "1300px",
            height: "400px",
            paddingBottom: "45%",
            position: "relative",
          }}
          className="align-center"
        >
          <iframe
            src="https://th.bing.com/th/id/R.e6e5ce70fb906bb37f279e1b5334955d?rik=UxOraY%2fLxJciQQ&riu=http%3a%2f%2fanhnendep.net%2fwp-content%2fuploads%2f2015%2f07%2fhinh-nen-trai-cay-dep-7.jpg&ehk=jeXHlEEMXQbQzFf8zMMKIOLLp8gILuxcXr0vd9BG9%2b8%3d&risl=&pid=ImgRaw&r=0"
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Welcome Home Minions GIF"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Home;