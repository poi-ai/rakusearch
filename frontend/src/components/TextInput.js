// TextInput.js

import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    return (
      <div className="form-group"> {/* Bootstrapのform-groupクラスを適用 */}
        <input type="text" className="form-control" placeholder="テキストを入力してください" /> {/* Bootstrapのform-controlクラスを適用 */}
      </div>
    );
  }
}

export default TextInput;
