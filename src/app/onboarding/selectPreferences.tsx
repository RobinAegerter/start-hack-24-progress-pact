"use client";

import { Button } from "@/components/ui/button";
import { Interest } from "@prisma/client";
import React from "react";
import { selectInterests, selectLanguage } from "./actions";
import { FaArrowDown } from "react-icons/fa";
import { Language } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface IInterest extends Partial<Interest> {
  selected: boolean;
}

interface selectPreferencesProps {
  preference: Interest[];
  onSubmit: () => void;
}

interface selectPreferencesState {
  interestsList: IInterest[];
  selectLanguage: Language | undefined;
  error: string | undefined;
}

export default class SelectPreferences extends React.Component<
  selectPreferencesProps,
  selectPreferencesState
> {
  constructor(props: selectPreferencesProps) {
    super(props);
    this.state = {
      error: undefined,
      selectLanguage: undefined,
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
  }

  handleChange = (language: Language) => {
    this.setState({ selectLanguage: language });
    this.setState({ error: undefined });
  };

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
        <div className="mt-20 outline rounded-xl h-10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <h3 className="justify-center mt-1.5">
                {this.state.selectLanguage === undefined
                  ? "Choose your Language"
                  : this.state.selectLanguage}
              </h3>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(Language).map((language) => (
                <DropdownMenuItem
                  onSelect={() => this.handleChange(language)}
                  key={language}
                >
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {this.state.error === undefined ? null : (
          <div className="m-10 mb-60">{this.state.error}</div>
        )}
        <Button
          onClick={() => {
            if (this.state.selectLanguage === undefined) {
              this.setState({ error: "Please select a language" });
              return;
            }
            selectLanguage(this.state.selectLanguage);
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
