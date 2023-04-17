// here we're selecting an HTML element, but maybe it's not certain that this elemente will be on the page, so TS will complain, because it would return "null", there are some ways of solving it...

// we could use the "!" (not) operator at the end of the selection to make sure it won't return null...
const button = document.querySelector("button")!;

// we could also check if the button exists before assigning an event handler...
if (button) {
  // or we could use optional chaining "?." to check if the button exists before adding the vent handler.
  button?.addEventListener("click", () => {
    console.log("clicked!");
  });
}

// PS: for more info about TS config check the notes.md file :)
