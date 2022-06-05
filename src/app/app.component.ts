import { AfterViewInit, Component } from '@angular/core';

declare var anime: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  countDownLabel = "";
  replacedImageIndex = 0;
  congratulations = false;

  ngAfterViewInit(): void {
    // Every second we replace the next image on the grid
    setInterval(() => {
      this.replacedImageIndex = (this.replacedImageIndex + 1) % 9;
    }, 1000);

    // Every second we refresh the countdown
    setInterval(() => {
      var now = new Date().getTime();
      var currentYear = new Date().getFullYear();
      var countDownDate = new Date("june 11, " + currentYear + " 12:00:00").getTime();
      var distance = countDownDate - now;
      // On the current year the date is already behind us, we need to check for next year
      if (distance < 0) {
        currentYear++;
        countDownDate = new Date("june 11, " + currentYear + " 12:00:00").getTime();
        distance = countDownDate - now;
      }
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.congratulations = (days == 0);
      this.countDownLabel = days + " días " + hours + " horas " + minutes + " minutos " + seconds + " segundos";
    });
  }

  getImageSourceForCurrentElement(index: number) {
    if (index == this.replacedImageIndex) {
      return "assets/" + index + "-word.jpg";
    }
    return "assets/" + index + ".jpg";
  }
}
