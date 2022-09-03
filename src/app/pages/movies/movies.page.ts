import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.imgUrl;
  constructor(
    private movieService: MovieService,
    private loadindCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadindCtrl.create({
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService
      .getTopRatedMovies(this.currentPage)
      .subscribe((response) => {
        loading.dismiss();
        this.movies.push(...response.results);

        event?.target.complete();
        if( event ){
          event.target.disabled = response.total_pages === this.currentPage;
        }
      });
  }
  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}
