import React from 'react'
import Profile from './Profile'

const Contributers = () => (
  <>
    <h1 id="contributors" className="px-5 py-2 text-warning text-4xl">
      Contributors
    </h1>
    <div className="mx-5 flex justify-evenly">
      <Profile
        name="Charlie Charboneau"
        picture="/images/charlie.jpeg"
        linkedIn="https://www.linkedin.com/in/charlie-charboneau-690780165"
        gitHub="https://www.github.com/CharlieCharboneau"
      />
      <Profile
        name="Lucas Contreras"
        picture="/images/lucas.jpg"
        linkedIn="https://www.linkedin.com/in/lucascontreras"
        gitHub="https://www.github.com/lucascontreras"
      />
      <Profile
        name="Matt Mattox"
        picture="/images/MattM.png"
        linkedIn="https://www.linkedin.com/in/mattmattox12/"
        gitHub="https://github.com/heyitsmattox"
      />
      <Profile
        name="Nestor Cayanan"
        picture="/images/nestorc.jpg"
        linkedIn="https://www.linkedin.com/in/nestorcayananjr"
        gitHub="https://www.github.com/nestorcayananjr"
      />
      <Profile
        name="Stephanie Serrano"
        picture="/images/stephanie.png"
        linkedIn="https://www.linkedin.com/in/stephanie-t-serrano"
        gitHub="https://www.github.com/stephanie-115"
      />
    </div>
  </>
)

export default Contributers
