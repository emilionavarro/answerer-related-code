import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AnswerService } from './shared/answer.service';
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Answer } from './shared/answer';

declare var componentHandler: any;

@Component({
    templateUrl: 'answerer.component.html',
    styleUrls: ['answerer.component.css']
})
export class AnswererComponent {
    question: string;
    answer: any;
    answerDetails: Answer;

    constructor(private location: Location, private answerService: AnswerService) {
    }

    goBack(): void {
        this.location.back();
    }

    ask() {
        this.answerService.getAnswer(this.question).pipe(
            map((res: Response) => res)
        ).subscribe(
            data => {
                console.log(data);
                this.answerDetails = this.getDetails(data);
                this.answer = data;
            },
            err => console.log(err),
            () => console.log('No api errors!')
        )
    }

    getDetails(data): Answer {
        if (data.topScoringIntent && data.entities) {
            var answer = new Answer(data.topScoringIntent.intent, data.entities);

            answer.process();

            return answer;
        }
    }

    ngAfterViewInit() {
        if (typeof componentHandler !== 'undefined') {
            componentHandler.upgradeAllRegistered();
        }
    }
}