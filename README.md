# 설치 및 기본 셋팅
    1) npx create-react-app <Project Name> --template=typescript
    2) npm i react-router-dom
    3) npm install recoil
        recoil>theme.tsx 파일 생성후 Atom 선언 하고 theme초기값 설정 진행
        import {atom} from "recoil";
        export const isDarkAtom = atom({
            key : "isDark",
            default : false,
        });
    4) npm i styled-components
       npm i --save-dev @types/styled-components
         ㄴ styled.d.ts 파일 생성후 아래 theme 선언
            import "styled-components";
            declare module "styled-components" {
                export interface DefaultTheme {
                    textColor : string;
                }
            }
         ㄴ theme.ts 파일 생성 후
            import {DefaultTheme} from "styled-components";
            export const darkTheme: DefaultTheme = {}
            등록하여 테마 사용 가능.
         ㄴ App.tsx 파일에 모든 컴포넌트를
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}> 로 감싼다.
            
    5) npm i react-query
        ㄴ index.tsx 파일에
        const queryClient = new QueryClient(); 선언 후
        <App/> 컴포넌트를 <QueryClientProvider client={queryClient}>
        로 감싼다.
        
    6) npm i framer-motion
    7) npm i react-helmet
    8) npm i react-hook-form
    9) npm i @fortawesome/fontawesome-svg-core
    npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
    npm i @fortawesome/react-fontawesome
    폰트어썸 무료 폰트 설치 후 사용하기.
    10) npm i uuid 랜덤한 uuid를 생성해줌
        npm i --save-dev @types/uuid

# Getting Movies Poster API
TheMovieDB API Key
https://www.themoviedb.org/settings/api?language=ko

TheMovieDB API Document
https://developers.themoviedb.org/3/movies/get-now-playing

TheMovieDB Image가져오기
이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기

# login server
npm i firebase@9.6.1 설치 해당 버전 사용하려면 router-dom 5.3이 설치되어 있어야 함.
신규버전으로 할 경우 Router v6버전에서만 호환됨

# Auth 인증하기
   1. firebase Auth 웹 생성
   2. 생성된 코드 제일 바깥쪽에 fbase.js 만들어서 붙여넣기
   3. Auth 구글, 깃헙 추가.
   4. 깃헙 추가시 깃헙 - setting - dev setting - auth add 에서 추가



# add Task

Tasks:
On the / (home) page implement sliders for: Latest movies, Top Rated Movies and Upcoming Movies.
On the /tv page implement sliders for: Latest Shows, Airing Today, Popular, Top Rated.
On the /search page implement sliders for movie results and tv results.
Make the /movie/:id prettier.
Implement /tv/:id as well.
