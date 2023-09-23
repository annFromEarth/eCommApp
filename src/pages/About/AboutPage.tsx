import { Container, Typography, Box, useTheme, Avatar, Link } from '@mui/material';

export default function About() {
  const plantsTheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: plantsTheme.palette.text.primary,
        background: plantsTheme.palette.background.paper,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(/img/about-us/houseplant-background.jpg) center/cover no-repeat',
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          fontWeight={700}
          sx={{ margin: '20px', color: '#fff' }}
        >
          About us
        </Typography>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: '80px' }}>
          Hello plant lovers! If you are on this page, probably you want to learn more about our
          cool team! Let&apos;s go! Our team consists of three front-end developers, and we are all
          girls. Below you can find out a little more information about each of us.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '80px',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              sx={{
                width: '200px',
                height: '200px',
                background: '#AAD398',
              }}
              alt="Yulia Sivacova"
              src="/img/about-us/Yulia.jpg"
            />
            <Typography variant="h5">Yulia Sivacova</Typography>
            <Typography>Frontend developer</Typography>
            <Typography>
              Yulia is a junior frontend developer and she was born in Minsk. She graduated from the
              Law College of BSU and Faculty of Law BSU. She has worked as a lawyer for several
              public and private companies. After, Yulia realized that she needed to find a work for
              life, a work that she would love and be passionate about. At the end of 2022, she went
              to the JS/FE PreSchool 2022Q4 course and successfully completed it. Her future plan is
              to realize herself. Yulia want to finish studies and find a job as a frontend
              developer.
            </Typography>
            <Typography>
              GitHub:{' '}
              <Link href="https://github.com/yusivacova" target="_blank">
                yusivacova
              </Link>
            </Typography>
          </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              sx={{
                width: '200px',
                height: '200px',
                background: '#AAD398',
              }}
              alt="Anna Dvor"
              src="/img/about-us/Anna.jpg"
            />{' '}
            <Typography variant="h5">Anna Dvor</Typography>
            <Typography>Frontend developer and team-lead</Typography>
            <Typography>
              Anna is an artist and designer, passionate about new technologies. She was born in
              Moscow and graduated from Moscow Surikov Art Institute in 2015. Since then she had
              been working as an artist in the sphere of theatre- and interior decoration, where she
              also encountered the need for creating a portfolio web-site. This experience revealed
              her interest for front-end development and coding. After finishing the RSSchool course
              she aspires to create unique web-portfolios for her fellow artists.
            </Typography>
            <Typography>
              GitHub:{' '}
              <Link href="https://github.com/annfromearth" target="_blank">
                annfromearth
              </Link>
            </Typography>
          </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              sx={{
                width: '200px',
                height: '200px',
                background: '#AAD398',
              }}
              alt="Julia Egorova"
              src="/img/about-us/Julia.PNG"
            />
            <Typography variant="h5">Julia Egorova</Typography>
            <Typography>Frontend developer</Typography>
            <Typography>
              Julia was born in Minsk and graduated from the Faculty of Biology of BSU in 2021.
              During her studies, Julia faced the need to write code in Python, which she liked, but
              this knowledge wasn&apos;t useful in her diploma. After a year of working as a
              microbiologist, she decided to try something new for her direction in programming. Now
              she is a young front-end developer, who wants to complete the RSSchool courses, find a
              job in the field of web development and continue to implement cool projects.
            </Typography>
            <Typography>
              GitHub:{' '}
              <Link href="https://github.com/pinkpony1106" target="_blank">
                pinkpony1106
              </Link>
            </Typography>
          </Container>
        </Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '25px',
          }}
        >
          In the implementation of this project, we used all our strength and tried to make this
          application accessible and user-friendly. So, let&apos;s talk about the contribution to
          the development of this project. Yulia is responsible for such parts of the project as
          routing, a detailed product page with a slider, product search, layout of part of the site
          and tests for our application. Our team lead Anna, worked on setting up the GitHub,
          implementing the registration page, profile page, layout of our website and adding
          products to the cart. Julia implemented such parts of the project as login, filtering and
          sorting products, displaying products and their categories, about us page. Of course, we
          encountered difficulties such as bugs or impossibility of implementing some logic...
          However, in such cases we held operational meetings in Google Meet and tried to resolve
          the problem. Mutual assistance and understanding are the best features of our team!
        </Typography>
        <>
          <Link
            href="https://rs.school/"
            target="_blank"
            sx={{
              width: '150px',
              height: '70px',
              padding: '10px',
              ':hover': {
                transform: 'scale3d(1.02, 1.02, 1)',
                transition: 'all 0.50s ease-in-out',
              },
            }}
          >
            <img src="/img/about-us/rs_school.svg"></img>
          </Link>
        </>
      </Container>
    </Box>
  );
}
