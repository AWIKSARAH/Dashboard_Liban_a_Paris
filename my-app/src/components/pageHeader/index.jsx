import "./pageHeader.css"
function PageHeader(props) {
    return ( <div className="page--header_container"><h1>{props.label}</h1></div> );
}

export default PageHeader;