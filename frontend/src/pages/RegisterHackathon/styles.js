import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 30px auto;

  .file {
    margin-top: 10px;
    margin-bottom: 15px;
    background-color: #fff;
    padding: 8px;
    border-radius: 6px;
    border: 2px solid #cccccc;
  }

  .input {
    background-color: #fff;
    padding: 8px;
    border-radius: 6px;
    border: 2px solid #cccccc;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .toast-background {
    background: lightcoral;
  }

  .toast-font-size {
    color: #fff;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
  }
  .toast-progress-bar {
    background: red;
  }
  .toast-background_success {
    background: #04a777;
  }
  .toast-progress-bar_success {
    background: #333745;
  }
`;
