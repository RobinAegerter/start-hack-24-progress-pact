"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Department } from "@prisma/client";
import { selectDepartment } from "./actions";
import { RotatingLines } from "react-loader-spinner";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

interface State {
  searchTerm: string;
  isRedirecting: boolean;
}

interface DepartementsCardsProps {
  DepartementsData: Department[];
}

class DepartementCards extends React.Component<DepartementsCardsProps, State> {
  constructor(props: DepartementsCardsProps) {
    super(props);
  }

  state: State = {
    searchTerm: "",
    isRedirecting: false,
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  renderNormalDepartementCards() {
    const { searchTerm } = this.state;
    const filteredOrganizations = this.props.DepartementsData.filter(
      (dep: Department) => {
        return dep.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    );
    return (
      <div>
        <Input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search locations..."
        />
        {filteredOrganizations.map((dep: Department) => (
          <Card
            className="m-3 h-16 cursor-pointer"
            key={dep.id}
            onClick={() => {
              selectDepartment(dep.id);
              this.setState({ isRedirecting: true });
            }}
          >
            {/* Make adjustments here based on your card structure and organization data*/}
            <CardHeader>
              <CardTitle>{dep.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  render() {
    console.log(this.props.DepartementsData);

    return this.state.isRedirecting ? (
      <div className="justify-center">
        <RotatingLines
          visible={true}
          width="96"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    ) : (
      this.renderNormalDepartementCards()
    );
  }
}

export default DepartementCards;
