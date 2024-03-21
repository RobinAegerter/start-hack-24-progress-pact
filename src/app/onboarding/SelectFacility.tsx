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
import { Organisation } from "@prisma/client";
import { selectFacility } from "./actions";

interface State {
  searchTerm: string;
}

interface OrganizationCardsProps {
  organizationsData: Organisation[];
  onSubmit: () => void;
}

class OrganizationCards extends React.Component<OrganizationCardsProps, State> {
  constructor(props: OrganizationCardsProps) {
    super(props);
  }

  state: State = {
    searchTerm: "",
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    const filteredOrganizations = this.props.organizationsData.filter(
      (org: Organisation) =>
        org.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <Input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search locations..."
        />
        {filteredOrganizations.map((org: Organisation) => (
          <Card
            className="m-3 h-32 cursor-pointer"
            key={org.id}
            onClick={() => {
              this.props.onSubmit();
              selectFacility(org.id);
            }}
          >
            {/* Make adjustments here based on your card structure and organization data*/}
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{org.location}</CardDescription>
            </CardContent>
            <CardFooter>{}</CardFooter>
          </Card>
        ))}
      </div>
    );
  }
}

export default OrganizationCards;
