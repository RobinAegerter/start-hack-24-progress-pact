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

interface State {
  searchTerm: string;
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
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    console.log(this.props.DepartementsData);
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
}

export default DepartementCards;
