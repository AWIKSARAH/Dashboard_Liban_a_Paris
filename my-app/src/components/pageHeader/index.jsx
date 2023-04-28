import "./pageHeader.css"
function PageHeader(props) {
    return ( <div className="page--header_container"><h2>{props.label}</h2></div> );
}

export default PageHeader;