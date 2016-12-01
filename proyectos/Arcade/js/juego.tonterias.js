var juego = {
	filas:[ [], [], [] ],
	espacioVacio:{
		fila: 2,
		columna: 2
	},
	
	iniciar: function (objeto)
	{
		this.instalarPiezas(objeto);	
		this.mezclarFichas(600);
		this.capturarTeclas();
	},

	crearPieza: function (idImagen, fi, co)
	{
		 var $ficha = $("<div>");
		 $ficha.addClass("pieza");
		 $ficha.css(
		 {
			 	top: fi * 200,
			 	left: co * 200,
			 	backgroundImage: "url(img/piezas/" + idImagen + ".jpg)"
		 });

		return {
			filaInicial: fi,
			columnaInicial: co,
			$ficha: $ficha
		};
	},
	
	instalarPiezas: function (tablero)
	{
		var contador = 0;
		for (var fi = 0; fi < 3; fi++)
		 {
			for (var co = 0; co < 3; co++) 
			{
				if (this.espacioVacio.columna === co && this.espacioVacio.fila === fi) 
				{
					this.filas[fi][co] = null;
				}
				else 
				{	
					contador = contador + 1;
					var pieza = this.crearPieza(contador, fi, co);
					this.filas[fi][co] = pieza;
					tablero.append( pieza.$ficha );

				}
			}	
		 }
	},
	
	moverHaciaAbajo: function()
	{
		var filaOrigen = this.espacioVacio.fila-1;
		var columnaOrigen = this.espacioVacio.columna;
		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},	
	
	moverHaciaArriba: function()
	{
		var filaOrigen = this.espacioVacio.fila +1;
		var columnaOrigen = this.espacioVacio.columna;
		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	
	moverHaciaLaDerecha: function()
	{
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna-1;
		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	
	moverHaciaLaIzquierda: function()
	{
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;
		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
	},
	
	capturarTeclas:  function()
	{
		var that = this;
		$(document).keydown( function (evento) 
		{

			switch(evento.which)
			{
				case 37:
					that.moverHaciaLaIzquierda();
				break;

				case 38:
					that.moverHaciaArriba();
				break;

				case 39:
					that.moverHaciaLaDerecha();
				break;

				case 40:
					that.moverHaciaAbajo();
				break;

				case 65:
					that.moverHaciaLaIzquierda();
				break;

				case 87:
					that.moverHaciaArriba();
				break;

				case 68:
					that.moverHaciaLaDerecha();
				break;

				case 83:
					that.moverHaciaAbajo();
				break;

				default: return;
			}
			that.chequearSiGano();
			evento.preventDefault();
		});
	},
	
	moverFichaFilaColumna:function($ficha, fi, co)
	{
		 $ficha.css
		 ({
			 	top: fi * 200,
			 	left: co * 200,
		 });
	},
	
	guardarEspacioVacio: function(fi,co)
	{
		this.espacioVacio.fila = fi;
		this.espacioVacio.columna = co;
		this.filas[fi][co]=null;
	},
	
	intercambiarPosicionConEspacioVacio: function(fi,co)
	{
		var ficha = this.filas[fi] && this.filas[fi][co];
		if(ficha !== undefined)
		{
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.moverFichaFilaColumna(ficha.$ficha, this.espacioVacio.fila, this.espacioVacio.columna);
			this.guardarEspacioVacio(fi,co);
		}
	},

	mezclarFichas: function(veces) {
		var that = this;
		var espera = 20;
	  setTimeout(function(){	
		for (var i = 0; i < veces; i++) {
			var numeroDe1a4 = Math.floor(1 + 4 * Math.random());
			switch (numeroDe1a4) 
			{
				case 1:
				  setTimeout(function(){
				   that.moverHaciaArriba(); },
					i + espera);
				break;	
				
				case 2:
				  setTimeout(function(){
				   that.moverHaciaLaDerecha(); },
					i + espera);
				break;
				
				case 3:
				  setTimeout(function(){
				   that.moverHaciaAbajo(); },
					i + espera);
				break;
				
				case 4:
				  setTimeout(function(){
				   that.moverHaciaLaIzquierda(); },
					i + espera);
				break;
			}
		}
	  },
	  250);
	},

	chequearSiGano(){
	    for (var f = 0; f < this.filas.length; f++) {
	      	for (var c = 0; c < this.filas.length; c++) {
	        	var ficha = this.filas[f][c];
	        	if(ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)){
	        	 return false;
	        	}
	      	}
	    }
	    setTimeout(function(){
	    return alert('Ahora que has ganado vamos a unirnos en una aventura llena de victorias y gloria, pero la cláusula número 452 es muy importante y consiste en.... RESOLVER ESTE ROMPECABEZAS INDEFINIDAMENTE. ¡BAKA!');
	      }, 250
	    );
		
		setTimeout(function(){
	    window.location.href = "ganador.dance.html";
		}, 1500
		);

		setTimeout(function(){
	    alert('Nah mentira ya ganaste campeón (?');
	      }, 1000
	    );
		
		juego.iniciarBurla();
	},

	iniciarBurla: function (objeto) {
		this.mezclarFichas(600);
	}

};

$(document).ready(function () 
{
	juego.iniciar( $ ("#juego"));	
});