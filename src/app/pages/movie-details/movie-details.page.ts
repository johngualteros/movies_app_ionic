import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  movie = null;
  imageBaseUrl = environment.imgUrl;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovie();
  }
  getMovie(){
    this.movieService.getMovieDetails(this.id).subscribe(response => {
      this.movie = response;
    });
  }

}
