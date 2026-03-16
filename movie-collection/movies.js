// 영화 배열
let movies = [];

// 기본 장르
const defaultGenre = "Unknown";

// 영화 1
let movie1 = {
  title: "센과 치히로의 행방불명",
  director: "미야자키 하야오",
  year: 2001,
  genre: "애니메이션"
};

// 영화 2
let movie2 = {
  title: "이터널 선샤인",
  director: "찰리 카우프만",
  year: 2004,
  genre: "드라마"
};

// 영화 3
let movie3 = {
  title: "다크 나이트",
  director: "크리스토퍼 놀란",
  year: 2008,
  genre: "액션"
};

// 배열에 영화 추가
movies.push(movie1);
movies.push(movie2);
movies.push(movie3);

// 영화 목록 출력 함수
function printMovies(movies) {

  console.log("Movie Collection:\n");

  var count = 0;

  for (let i = 0; i < movies.length; i++) {

    let movie = movies[i];

    if (!movie.genre) {
      movie.genre = defaultGenre;
    }

    console.log(
      (i + 1) +
      ". Title: " + movie.title +
      ", Director: " + movie.director +
      ", Year: " + movie.year +
      ", Genre: " + movie.genre
    );

    count++;
  }

  console.log("\nTotal Movies: " + count);
}

// 함수 실행
printMovies(movies);