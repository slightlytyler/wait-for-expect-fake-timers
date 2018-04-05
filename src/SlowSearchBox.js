import React from "react";

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const SOME_EMOJIS = {
  apple: "🍎",
  bacon: "🥓",
  camel: "🐫",
  dog: "🐶"
};

const findEmojis = query => {
  if (!query) return null;
  const results = Object.entries(SOME_EMOJIS)
    .filter(([k, v]) => k.includes(query))
    .map(([_, v]) => v);
  if (!results.length) return null;
  return results;
};

const Input = props => <input {...props} data-testid="input" />;

const ResultItem = props => <li data-testid="result-item">{props.result}</li>;

const ResultList = props =>
  !props.results ? null : (
    <ul data-testid="result-list">
      {props.results.map(r => <ResultItem key={r} result={r} />)}
    </ul>
  );

class SlowSearchBox extends React.Component {
  state = {
    query: "",
    results: null
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query !== prevState.query) {
      this.search();
    }
  }

  handleQueryChange = e => this.setState({ query: e.target.value });

  search = debounce(
    () => this.setState({ results: findEmojis(this.state.query) }),
    5000
  );

  render() {
    return (
      <div data-testid="slow-search-box">
        <Input onChange={this.handleQueryChange} value={this.state.query} />
        <ResultList results={this.state.results} />
      </div>
    );
  }
}

export default SlowSearchBox;
