"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { selectInterests } from "./actions";
import { Interest } from "@prisma/client";

export interface IInterest extends Interest {
  selected: boolean;
}

interface selectPreferencesProps {
  preference: Interest[];
  onSubmit: () => void;
}

interface selectPreferencesState {
  interestsList: IInterest[];
}

export default class SelectPreferences extends React.Component<
  selectPreferencesProps,
  selectPreferencesState
> {
  constructor(props: selectPreferencesProps) {
    super(props);
    this.state = {
      interestsList: this.props.preference.map((interest) => ({
        title: interest.title,
        id: interest.id,
        selected: false, // Initially, none of the interests are selected
      })),
    };
  }

  interestGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))" /* responsive grid */,
    gap: "1rem" /* space between buttons */,
    marginTop: "2rem",
  };

  handleClickButton(interest: Interest) {
    console.log(this.state.interestsList);
    this.setState((prevState) => ({
      interestsList: prevState.interestsList.map((item) =>
        item.id === interest.id ? { ...item, selected: !item.selected } : item
      ),
    }));
    console.log(this.state.interestsList);
  }

  render() {
    return (
      <div>
        <div style={this.interestGridStyle}>
          {this.state.interestsList.map((interest) => (
            <Button
              onClick={() => this.handleClickButton(interest)}
              className={`px-4 py-2 rounded-full ${
                interest.selected
                  ? "bg-primary text-white border border-primary"
                  : "bg-white text-primary border border-primary"
              }`}
              variant={"outline"}
              key={interest.id}
              /* other props */
            >
              {interest.title}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => {
            selectInterests(this.state.interestsList);
            this.props.onSubmit();
          }}
          className="fixed bottom-0 inset-x-0 mx-auto mb-8 w-11/12 bg-primary text-white py-3 text-lg font-semibold rounded-full"
        >
          Next
        </Button>
      </div>
    );
  }
}
