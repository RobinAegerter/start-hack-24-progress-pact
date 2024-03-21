"use client";

import { Button } from "@/components/ui/button";
import { Interest } from "@prisma/client";
import React from "react";
import { selectInterests } from "./actions";

export interface IInterest extends Partial<Interest> {
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
              onClick={() => this.handleClickButton(interest as Interest)}
              className={`px-4 py-2 rounded-full ${
                interest.selected
                  ? "bg-primary text-white border border-primary hover:bg-primary-200 hover:text-white-600"
                  : "bg-white text-primary border border-primary hover:bg-gray-100 hover:text-primary-600"
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
          className="fixed bottom-11 inset-x-0 mx-auto mb-8 w-11/12 bg-primary text-white py-3 text-lg font-semibold rounded-full"
        >
          Next
        </Button>
      </div>
    );
  }
}
