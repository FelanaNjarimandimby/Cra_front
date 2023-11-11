import React, { Component } from "react";
import axios from "axios";
import { Pie, Line, Bar } from "react-chartjs-2";
import { variables } from "../../Variables";
import "chart.js/auto";

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(variables.API_URL + "coutfret/chart")
      .then((res) => {
        const ipl = res.data;
        let PoidsMax = [];
        let Coutf = [];
        ipl.forEach((record) => {
          PoidsMax.push(record.CoutPoidsMax);
          Coutf.push(record.Cout);
        });

        this.setState({
          Data: {
            labels: PoidsMax,
            datasets: [
              {
                label: "IPL 2018/2019 Top Run Scorer",
                data: Coutf,
                backgroundColor: [
                  "#3cb371",
                  "#0000FF",
                  "#9966FF",
                  "#4C4CFF",
                  "#00FFFF",
                  "#f990a7",
                  "#aad2ed",
                  "#FF00FF",
                  "Blue",
                  "Red",
                ].slice(0, Coutf.length), // Ensure colors array length matches data length
              },
            ],
          },
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Problème de récupération de données:", error);
        this.setState({
          loading: false,
          error: "Problème de récupération de données",
        });
      });
  }

  render() {
    const { Data, loading, error } = this.state;

    return (
      <div width="600">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {Data.labels && (
          <Bar
            width={400}
            height={400}
            data={Data}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    );
  }
}

export default DashboardAdmin;
