const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");

const Section = props => {
  const { title, body } = props;
  return (
    <div>
      {title}
      {body}
    </div>
  );
};
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

const Now = props => {
  const { Container } = CompLibrary;
  const currentQuarter = quarters[0];
  return (
    <Container>
      <div style={{ marginTop: "50px" }}>
        <figure style={{ maxWidth: "700px" }}>
          <img
            src="https://cdn-images-1.medium.com/max/2600/1*WEjosLr_zss71HvJHZneew.jpeg"
            width="100%"
          />
          <figcaption style={{ fontSize: "10pt", color: "grey" }}>
            Map of my{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/blog/2019/02/09/visiting-london-during-layover-at-airport-heathrow-airport-gatwich-airport"
            >
              one day trip to London
            </a>
          </figcaption>
        </figure>
        <br />
        <br />
        <p>
          This year, I’m finding myself, figuring out what I really want to be
          known for and learning to be more patient.
        </p>
        <p>
          I’m{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.enneagraminstitute.com/type-3"
          >
            Type 3
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://en.wikipedia.org/wiki/ISTP"
          >
            ISTP
          </a>
          . Here’s what I’m up to{" "}
          {quarters.map((q, i) => (
            <span key={i}>
              <a
                href={`#${q.name}`}
                key={q.name}
                onClick={() => {
                  console.log("uchi");
                }}
              >
                {i === 0 ? " this quarter " : ` ${q.name} `}{" "}
              </a>
              \
            </span>
          ))}
        </p>
      </div>
      {quarters.map(currentQuarter => {
        return (
          <div id={currentQuarter.name}>
            <br />
            <h2>{currentQuarter.name}</h2>
            {currentQuarter.details.map(sData => (
              <Section {...sData} key={sData.title} />
            ))}
            <br />
            <hr />
          </div>
        );
      })}
      Updated Saturday, August 10, 2019. Inspired by
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.zimism.com/now"
      >
        {" "}
        Zim Ugochukwu
      </a>
      <hr />
      <br />
    </Container>
  );
};
Now.title = "Uchi's focus at this point in his life";
Now.description =
  "This page highlights what Uchi is currently working on, reading, listening to, and learning. It also shows where he has recently travelled to ";

module.exports = Now;

const quarters = [
  {
    name: "2019 Q3",
    details: [
      {
        title: <h3>Working</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>Building a fundsharing platform.</li>
              <li>
                Planning{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://naijahacks.com"
                >
                  NaijaHacks 2019
                </a>
                . Date and Venue secured.
              </li>
              <li>
                Joined a new{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://medium.com/@uchi/how-i-decided-which-software-engineering-job-offer-to-accept-429721e18c2a"
                >
                  Company
                </a>{" "}
                and team and now working a a Blockchain digital identity
                network.
              </li>
              <li>
                Mentoring the Bio-remote team, one of the winners of{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/search?f=tweets&vertical=default&q=%23naijahacks2018&src=typd"
                >
                  #NaijaHacks2018
                </a>{" "}
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Reading</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.red-dot-shop.com/en/design-yearbooks/"
                >
                  Red Dot Design Yearbook set
                </a>{" "}
                by Red Dot Design award
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.goodreads.com/book/show/28673347-the-wealthy-renter"
                >
                  The Wealthy Renter
                </a>{" "}
                by Alex Avery
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Listening</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/Start-Why-Leaders-Inspire-Everyone/dp/1591846447"
                >
                  Start with Why: How Great Leaders Inspire Everyone to Take
                  Action
                </a>{" "}
                by Simon Sinek
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.audible.ca/pd/Steve-Jobs-Audiobook/B071Z51HRG"
                >
                  Steve Jobs
                </a>{" "}
                by Walter Isaacson
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.audible.ca/pd/Dare-to-Lead-Audiobook/B07DJXV4V6"
                >
                  Dare to Lead - Brave Work. Tough Conversations. Whole Hearts.
                </a>{" "}
                by Brené Brown
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.audible.ca/pd/The-Laws-of-Human-Nature-Audiobook/B07DKR8G3D?"
                >
                  The Laws of Human Nature
                </a>{" "}
                by Robert Greene
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.audible.ca/pd/The-Power-Broker-Audiobook/B072FD7RP6"
                >
                  The Power Broker - Robert Moses and the Fall of New York
                </a>{" "}
                by Robert A. Caro
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.audible.ca/pd/Algorithms-to-Live-By-Audiobook/B0711GFR5F"
                >
                  Algorithms to Live By - The Computer Science of Human
                  Decisions
                </a>{" "}
                by Brian Christian & Tom Griffiths
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Learning</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.startupschool.org"
                >
                  Startup School
                </a>{" "}
                by YCombinator
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.lynda.com/course-tutorials/Foundations-Fourth-Industrial-Revolution-Industry-4-0/743170-2.html"
                >
                  Foundations of The Fourth Industrial Revolution (Industry 4.0)
                </a>{" "}
                by Jonathan Reichental
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Travel</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                Q1 - Nigeria,{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/blog/2019/02/09/visiting-london-during-layover-at-airport-heathrow-airport-gatwich-airport"
                >
                  United Kingdown
                </a>
              </li>
              <li>Q2 - USA, Germany, Hungary, Czech Republic</li>
              <li>Q3 - USA</li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Location</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>Right now in Canada</ul>
          </div>
        )
      }
    ]
  },
  {
    name: "2019 Q2",
    details: [
      {
        title: <h3>Working</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>Exploring a Crowdlending and social credit platform</li>
              <li>
                Planning{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://naijahacks.com"
                >
                  NaijaHacks 2019
                </a>
              </li>
              <li>
                Asking the tough questions about long term goals, direction and
                plans
              </li>
              <li>
                Mentoring the Bio-remote team, one of the winners of{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/search?f=tweets&vertical=default&q=%23naijahacks2018&src=typd"
                >
                  #NaijaHacks2018
                </a>{" "}
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Reading</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.goodreads.com/book/show/43078245-risk-and-return"
                >
                  Risk and return
                </a>{" "}
                by Yomi Jemibewon
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.goodreads.com/book/show/28673347-the-wealthy-renter"
                >
                  The Wealthy Renter
                </a>{" "}
                by Alex Avery
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/0393318885/"
                >
                  Wealth And Poverty Of Nations
                </a>{" "}
                by David S Landes
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Listening</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B072F85DT1"
                >
                  How to Win Friends and Influence People in the Digital Age
                </a>{" "}
                by Dale Carnegie & Associates
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B072HSPZ6V"
                >
                  The Hard Thing About Hard Things
                </a>{" "}
                by Ben Horowitz
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B07B5JTSN9"
                >
                  Capital: Volume 1: A Critique of Political Economy
                </a>{" "}
                by Karl Marx
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B072HZ5Y3W"
                >
                  Soft Skills: The Software Developer's Life Manual
                </a>{" "}
                by John Sonmez
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B06Y2H2CJY"
                >
                  The Subtle Art of Not Giving a F*ck
                </a>{" "}
                by Mark Manson
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/gp/product/B07149J5VB"
                >
                  The Intelligent Investor
                </a>{" "}
                by Benjamin Graham
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Learning</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.lynda.com/Blockchain-tutorials/Blockchain-Beyond-Basics/636127-2.html"
                >
                  Blockchain: Beyond the Basics
                </a>{" "}
                by Jonathan Reichental
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.lynda.com/course-tutorials/Foundations-Fourth-Industrial-Revolution-Industry-4-0/743170-2.html"
                >
                  Foundations of The Fourth Industrial Revolution (Industry 4.0)
                </a>{" "}
                by Jonathan Reichental
              </li>
            </ul>
          </div>
        )
      },
      {
        title: <h3>Travel</h3>,
        body: (
          <div>
            <ul style={{ paddingLeft: "80px" }}>
              <li>
                Q1 - Nigeria,{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/blog/2019/02/09/visiting-london-during-layover-at-airport-heathrow-airport-gatwich-airport"
                >
                  United Kingdown
                </a>
              </li>
              <li>Q2 - USA, Germany, Hungary, Czech Republic</li>
            </ul>
          </div>
        )
      }
    ]
  }
];
