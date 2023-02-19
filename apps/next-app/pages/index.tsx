import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <h2>Resources &amp; Tools</h2>

      <p>Here are some links to help you get started.</p>
      <ul className="resources">
        <li className="col-span-2">
          <a className="resource flex" href="https://genesis.pscloudhub.com/documentation/">
            Scale React Development with Genesis Docs
          </a>
        </li>
      </ul>
    </StyledPage>
  );
}

export default Index;
