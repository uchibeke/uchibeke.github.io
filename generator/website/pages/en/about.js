const React = require('react')

const team = [
  {
    name: 'Chi',
    title: 'Fullstack Developer',
    tw: 'https://medium.com/@nwalorc',
    lk: 'https://www.linkedin.com/in/chibuzor-nwalor-8383668b/',
    picture: 'https://lushplans.com/img/team/chi.png',
    details: 'https://www.linkedin.com/in/chibuzor-nwalor-8383668b/'
  },
  {
    name: 'Jaja',
    title: 'Business Lead',
    tw: 'https://twitter.com/jajaPhd',
    lk: 'https://ng.linkedin.com/in/jajacjasper',
    picture: 'https://lushplans.com/img/team/jasper.png',
    details: 'https://ng.linkedin.com/in/jajacjasper'
  },
  {
    name: 'Seyi',
    title: 'UI/UX Designer',
    tw: 'https://twitter.com/seyike',
    lk: 'https://dribbble.com/4th_clover',
    picture: 'https://lushplans.com/img/team/seyi.png',
    details: 'https://dribbble.com/4th_clover'
  },
  {
    name: 'Tayo',
    title: 'Fullstack Developer',
    tw: 'https://medium.com/@eyitayoogunbiyi',
    lk: 'https://www.linkedin.com/in/eyitayo-ogunbiyi-b226a9128/',
    picture: 'https://lushplans.com/img/team/tayo.png',
    details: 'https://www.linkedin.com/in/eyitayo-ogunbiyi-b226a9128/'
  },
  {
    name: 'Uchi',
    title: 'Founder',
    tw: 'https://twitter.com/king_uchi',
    lk: 'https://linkedin.com/in/nickku',
    picture: 'https://lushplans.com/img/team/uchi.png',
    details: 'https://linkedin.com/in/nickku'
  }
]
const advisers = [
  {
    name: "Oluwole Oluyemi",
    title: 'Board Member',
    work: 'Senior Partner - Rodl & Partners',
    tw: '',
    lk: 'https://www.linkedin.com/in/oluwole-oluyemi-0a217421/',
    picture: 'https://lushplans.com/img/team/wole.jpeg',
    details: 'https://www.linkedin.com/in/oluwole-oluyemi-0a217421/'
  }
]

class Team extends React.Component {
  teamCard (person) {
    return (
      <div className='at-column' key={person.name + Math.random()}>
        <a href={person.details}  target="_blank" rel="noopener noreferrer"> 
          <div className='at-user'>
            <div className='at-user__avatar'>
              <img src={person.picture || 'https://keytokids.com.au/wp-content/uploads/2017/09/placeholder-face-big.png'} />
            </div>
            <div className='at-user__name'>{person.name}</div>
            <div className='at-user__title'>
              {person.title}
              <br></br>
              {person.work}
            </div>
            <ul className='at-social'>
              {/* <li className='at-social__item'><a href={person.fb} target="_blank" rel="noopener noreferrer">
                <svg viewBox='0 0 24 24' width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M14 9h3l-.375 3H14v9h-3.89v-9H8V9h2.11V6.984c0-1.312.327-2.304.984-2.976C11.75 3.336 12.844 3 14.375 3H17v3h-1.594c-.594 0-.976.094-1.148.281-.172.188-.258.5-.258.938V9z' fill-rule='evenodd' />
                </svg></a></li> */}
              <li className='at-social__item'><a href={person.lk} target='_blank' rel='noopener noreferrer'>
                <svg viewBox='0 0 24 24' width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19.547 3c.406 0 .75.133 1.031.398.281.266.422.602.422 1.008v15.047c0 .406-.14.766-.422 1.078a1.335 1.335 0 0 1-1.031.469h-15c-.406 0-.766-.156-1.078-.469C3.156 20.22 3 19.86 3 19.453V4.406c0-.406.148-.742.445-1.008C3.742 3.133 4.11 3 4.547 3h15zM8.578 18V9.984H6V18h2.578zM7.36 8.766c.407 0 .743-.133 1.008-.399a1.31 1.31 0 0 0 .399-.96c0-.407-.125-.743-.375-1.009C8.14 6.133 7.813 6 7.406 6c-.406 0-.742.133-1.008.398C6.133 6.664 6 7 6 7.406c0 .375.125.696.375.961.25.266.578.399.984.399zM18 18v-4.688c0-1.156-.273-2.03-.82-2.624-.547-.594-1.258-.891-2.133-.891-.938 0-1.719.437-2.344 1.312V9.984h-2.578V18h2.578v-4.547c0-.312.031-.531.094-.656.25-.625.687-.938 1.312-.938.875 0 1.313.578 1.313 1.735V18H18z' fillRule='evenodd' />
                </svg></a></li>
              <li className='at-social__item'><a href={person.tw} target='_blank' rel='noopener noreferrer'>
                <svg viewBox='0 0 24 24' width='18' height='18' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M20.875 7.5v.563c0 3.28-1.18 6.257-3.54 8.93C14.978 19.663 11.845 21 7.938 21c-2.5 0-4.812-.687-6.937-2.063.5.063.86.094 1.078.094 2.094 0 3.969-.656 5.625-1.968a4.563 4.563 0 0 1-2.625-.915 4.294 4.294 0 0 1-1.594-2.226c.375.062.657.094.844.094.313 0 .719-.063 1.219-.188-1.031-.219-1.899-.742-2.602-1.57a4.32 4.32 0 0 1-1.054-2.883c.687.328 1.375.516 2.062.516C2.61 9.016 1.938 7.75 1.938 6.094c0-.782.203-1.531.609-2.25 2.406 2.969 5.515 4.547 9.328 4.734-.063-.219-.094-.562-.094-1.031 0-1.281.438-2.36 1.313-3.234C13.969 3.437 15.047 3 16.328 3s2.375.484 3.281 1.453c.938-.156 1.907-.531 2.907-1.125-.313 1.094-.985 1.938-2.016 2.531.969-.093 1.844-.328 2.625-.703-.563.875-1.312 1.656-2.25 2.344z' fillRule='evenodd' />
                </svg></a></li>
            </ul>
          </div>
        </a>
      </div>
    )
  }

  render () {
    return (
      <div className='team-container'>
        <div className='at-section'>
          <div className='at-section__title'>Meet us</div>
        </div>
        <div>
          <h2 className='team-desc values'>
            Autonomy, Humility & Ambition (AHA)
          </h2>
        </div>
        <div className='at-grid' data-column='3'>
          { team.map((item) => {
            return this.teamCard(item)
          }) }
          {this.teamCard({
            name: 'You',
            title: 'Designer',
            details: 'https://lushplans.com/docs/designer.html'
          })}
          {this.teamCard({
            name: 'You',
            title: 'Developer',
            details: 'https://lushplans.com/docs/fullstack-developer-2.html'
          })}
          {this.teamCard({
            name: 'You',
            title: 'Sales',
            details: 'https://lushplans.com/docs/marketing-intern.html'
          })}
          {this.teamCard({
            name: 'You',
            title: 'Marketing',
            details: 'https://lushplans.com/docs/marketing-intern.html'
          })}
        </div>
        <div>
          <h2 className='team-desc values'>
            Board of Advisors
          </h2>
        </div>
        <div className='at-grid' data-column='3'>
          { advisers.map((item) => {
            return this.teamCard(item)
          }) }
          {this.teamCard({
            name: 'You',
            title: 'Board Member',
            details: 'mailto:uchi@lushplans.com?subject=Join Board of Advisors&body=Hi, writing to ask about joining Lush Plans board of Advisors.My \nName: \nTitle: \nMotivation: \nLinkedin: \n'
          })}
          {this.teamCard({
            name: 'You',
            title: 'Board Member',
            details: 'mailto:uchi@lushplans.com'
          })}
        </div>
        <div>
          <p className='team-desc'>
            Everything that we do, we believe in thinking differently to make a difference. We believe in challenging ourselves to surpass our current best. 
          </p>
          <p className='team-desc'>
            We are a group of tech's best developers and designers who have come together behind a mission to create an entertainment movement and we are starting first with weddings.
          </p>
          <p className='team-desc'>
            We have experience working with people of many cultures in different countries. So if you enjoy working with a diverse, talented, and passionate team to empower users, Lush plans is the place for you.
          </p>
          <p className='team-desc'>
            If you love working with the latest and greatest technology and tools,  this is the opportunity for you. You will be working on apps that will be used in many events in Nigeria and Africa.
          </p>
          <p className='team-desc'>
            <a href="/docs/careers.html">Learn more and see current jobs...</a>
          </p>
        </div>
      </div>
    )
  }
}
Team.title = 'Team - Nigerian Wedding Planner and Wedding package builder. Plan Nigerian Wedding'
Team.description = 'Lush Plans is a platform for planning your wedding. At Lush Plans, we are commited to making it easy to plan a Nigerian wedding. You can plan traditional or white wedding. Start for free'

module.exports = Team
