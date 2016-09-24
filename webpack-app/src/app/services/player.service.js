"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var PlayerService = (function () {
    function PlayerService(http) {
        this.http = http;
        this.playersURL = 'http://localhost:5050/players';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    PlayerService.prototype.setCurrentPlayer = function (player) {
        this.currentPlayer = player;
    };
    PlayerService.prototype.logout = function () {
        var _this = this;
        if (this.currentPlayer) {
            return this.delete(this.currentPlayer.id).then(function () {
                _this.currentPlayer = null;
            });
        }
    };
    PlayerService.prototype.getPlayers = function () {
        return this.http.get(this.playersURL)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlayerService.prototype.getPlayer = function (id) {
        return this.http.get(this.playersURL + "/" + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PlayerService.prototype.update = function (player) {
        var url = this.playersURL + "/" + player.id;
        return this.http
            .put(url, JSON.stringify(player), { headers: this.headers })
            .toPromise()
            .then(function () { return player; })
            .catch(this.handleError);
    };
    PlayerService.prototype.create = function (name) {
        return this.http
            .post(this.playersURL, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PlayerService.prototype.delete = function (id) {
        var url = this.playersURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PlayerService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map