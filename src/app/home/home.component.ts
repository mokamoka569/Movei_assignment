import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../movie.service';
import { log } from 'console';
import { Subscription } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { IMovei } from '../imovei';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.Component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  subdata:Subscription=new Subscription
  movies:IMovei[]=[]
  imgPath:string='https://image.tmdb.org/t/p/w500'
  private readonly movieService=inject(MovieService)
  ngOnInit(): void {
   this.subdata= this.movieService.getdata().subscribe({
      next:(res)=>{
        this.movies=res.results
        console.log(res.results);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }
  ngOnDestroy(): void {
   this.subdata.unsubscribe()
    
  }
}