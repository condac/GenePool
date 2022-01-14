//--------------------------------------------------------------------------
//                                                                        
//    This file is part of GenePool Swimbots.                             
//    Copyright (c) 2021 by Jeffrey Ventrella - All Rights Reserved.      
//                                                                        
//    See the README file or go to swimbots.com for full license details.           
//    You may use, distribute, and modify this code only under the terms  
//    of the "Commons Clause" license (commonsclause.com).                
//                                                                        
//    This software is intended for education, game design, and research. 
//                                                                        
// -------------------------------------------------------------------------- 

"use strict";


//const NUM_GENES = 100;
const NUM_GENES = 256;

//const MUTATION_RATE   = 0.0;
//const MUTATION_RATE	= 0.01; // original
//const MUTATION_RATE	= 0.05;
//const MUTATION_RATE	= 0.2;
//const MUTATION_RATE   = 1.0;

//const CROSSOVER_RATE	= 0.2;
const MIN_GENE_VALUE	= 0;

//const NON_REPRODUCING_JUNK_DNA_LIMIT = 0.9; 


const PRESET_GENOTYPE_DARWIN    =  0;
const PRESET_GENOTYPE_WALLACE   =  1;
const PRESET_GENOTYPE_MENDEL    =  2;
const PRESET_GENOTYPE_TURING    =  3;
const PRESET_GENOTYPE_MARGULIS  =  4;
const PRESET_GENOTYPE_WILSON    =  5;
const PRESET_GENOTYPE_DAWKINS   =  6;
const PRESET_GENOTYPE_DENNETT   =  7;

/*
const PRESET_GENOTYPE_THING     =  8;
const PRESET_GENOTYPE_CRAZY     =  9;
const PRESET_GENOTYPE_OTTO      = 10;
const PRESET_GENOTYPE_SQUIRM    = 11;
const PRESET_GENOTYPE_WHIPPER   = 12;
const PRESET_GENOTYPE_FAST      = 13;
const PRESET_GENOTYPE_BLIP      = 14;
*/


//-------------------
function Genotype()
{
	//------------------------------------------------
	// create array of genes and initialize to 0
	//------------------------------------------------
	let _genes = new Array( NUM_GENES ); 
	
    for (let g=0; g<NUM_GENES; g++)
    {
        _genes[g] = 0;             
    }

	//--------------------------------
	// randomize genes
	//--------------------------------
	this.randomize = function()
	{	    
        //----------------------------------------------
        // each gene is a non-negative integer < 256
        //----------------------------------------------
		for (let g=0; g<NUM_GENES; g++)
		{
			_genes[g] = Math.floor( gpRandom() * BYTE_SIZE );
            assert( _genes[g] < BYTE_SIZE, "Genotype: randomize: _genes[g] < BYTE_SIZE" );  
            assertInteger( _genes[g], "Genotype:randomize; assertInteger( _genes[g]" );	
		}
	}
		
	//------------------------------------------
	// set all genes to one value
	//------------------------------------------
	this.setAllGenesToOneValue = function(v)
	{	    
		for (let g=0; g<NUM_GENES; g++)
		{
			_genes[g] = v;
            assert( _genes[g] < BYTE_SIZE, "Genotype:setAllGenesToOneValue: _genes[g] < BYTE_SIZE" );  	
            assertInteger( _genes[g], "Genotype:setAllGenesToOneValue; assertInteger( _genes[g]" );	
		}		
	}

	
	//------------------------------------------
	// set all genes to zero
	//------------------------------------------
	this.clear = function(v)
	{	    
		for (let g=0; g<NUM_GENES; g++)
		{
			_genes[g] = 0;  			
		}		
	}
	
    //-------------------------------
	this.getGeneValue = function(g)
	{ 
	    //console.log( _genes[g] );

        assertInteger( _genes[g], "Genotype:getGeneValue; assertInteger( _genes[g]" );	
	
        return _genes[g];
    }  
 
    //-------------------------------
	this.getGeneName = function(g)
	{ 
        return "not implemented yet!";
    }  
 
    //-------------------------------
	this.getGenes = function()
	{ 
        return _genes;
    }
 
    //-----------------------------------
    this.setGenes = function(g)
	{ 
        for (let i=0; i<NUM_GENES; i++)
        {
            assertInteger( g[i], "Genotype:setGenes: assertInteger: g[i]" );
        }

        _genes = g;
    }

    //-----------------------------------
	this.setGeneValue = function( g, v )
	{ 
        assert( v < BYTE_SIZE, "Genotype:setGeneValue: v < BYTE_SIZE");
        assertInteger( v, "Genotype:setGeneValue; assertInteger, v" );	

        _genes[g] = v;
    } 
    
    
    //------------------------------------------------
	this.copyFromGenotype = function( otherGenotype )
	{ 
        for (let g=0; g<NUM_GENES; g++)
        {        
            _genes[g] = otherGenotype.getGeneValue(g);
            assert( _genes[g] < BYTE_SIZE, "Genotype:copyFromGenotype: assert _genes[g] < BYTE_SIZE" );
            assertInteger( _genes[g], "Genotype:copyFromGenotype; assertInteger, _genes[g]" );	        
        }
    }    
    
	//--------------------------------
	// set to Froggy
	//--------------------------------
	this.setToFroggy = function()
	{ 
	    let g = -1;
	    
//g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE ); // frequency
g++; _genes[g] = 255;
        g++; _genes[g] =  70; //cutOff        
        
		for (let c=0; c<3; c++)
		{
            let category    = 0;
            let redTest     = 0;
            let startWidth  = 160;
            let endLength   = 200;

            if ( c === 0 )
            {
                category    = 200;
                redTest     = 255;
                startWidth  = 255;
                endLength   = 0;
            }  

            //-----------------------------------------
		    // order matters!!!
            //-----------------------------------------
            g++; _genes[g] =  80;       //start red
            g++; _genes[g] = 150;       //start green
            g++; _genes[g] =  20;       //start blue
            g++; _genes[g] =  80;       //end red
            g++; _genes[g] = 150;       //end green
            g++; _genes[g] =  20;       //end blue            
            g++; _genes[g] = startWidth;//startWidth      
            g++; _genes[g] =  80;       //endWidth        
            g++; _genes[g] = 100;       //startLength     
            g++; _genes[g] = endLength; //endLength                 
            
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //amp             
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //phase      
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //turnAmp         
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //turnPhase       
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //branchAmp             
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //branchPhase      
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //branchTurnAmp         
            g++; _genes[g] = Math.floor( gpRandom() * BYTE_SIZE );  //branchTurnPhase       
            
            g++; _genes[g] = 0;         //sequenceCount       
            g++; _genes[g] = 0;         //branchPeriod    
            g++; _genes[g] = 180;       //branchAngle     
            g++; _genes[g] = 100;       //branchNumber    
            g++; _genes[g] = 0;         //branchShift                 
            g++; _genes[g] = category;  //branchCategory  
            g++; _genes[g] = 0;         //branchReflect               
            
            g++; _genes[g] = 255;       //splined   
            g++; _genes[g] = 100;       //end cap spline 
	    }
    }


	//--------------------------------
	// set to preset
	//--------------------------------
	this.setToPreset = function(i)
	{ 	
	    if ( i === PRESET_GENOTYPE_DARWIN )
        {
            
            _genes = [221,119,52,33,67,152,215,148,178,16,90,96,24,228,117,196,63,226,175,42,189,188,177,128,231,92,193,72,96,174,59,125,130,71,45,246,137,237,225,87,179,130,178,25,221,61,90,200,57,185,107,126,58,79,161,175,125,36,88,100,72,123,43,34,22,251,26,194,105,75,99,131,154,33,0,163,244,93,132,10,126,240,253,18,122,82,226,208,139,163,228,191,184,202,109,231,66,133,24,208,3,222,132,72,228,212,147,195,115,7,103,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,218,0,152,0,229,0,0,0,0,0,0,0,0,0,61,0,0,0,0,0,0,0,0,0,226,0,0,0,0,0,0,0,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0,0,0,0,0,0,0,0,230,0,0,0,0,141,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,77,0];
            
            
            
            //_genes = [206,68,117,146,159,220,112,48,236,144,137,53,248,196,63,41,102,208,124,237,190,206,136,188,168,176,106,188,155,52,104,70,31,239,156,215,57,233,191,73,171,226,221,194,43,73,0,84,183,2,139,138,232,22,245,149,20,146,198,172,45,36,58,32,81,61,30,3,213,133,227,198,168,108,119,177,101,4,173,163,161,115,149,28,145,14,71,132,150,246,130,59,131,123,107,179,121,13,78,121,172,7,111,52,117,17,200,127,90,175,164,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
            
            
            
            //_genes = [148,179,153,206,12,89,101,228,176,166,129,117,172,249,172,220,200,68,191,80,40,163,98,92,65,123,239,249,57,197,136,67,205,35,139,4,43,12,240,193,210,209,127,20,207,180,226,10,182,214,39,227,168,193,222,30,221,253,168,11,180,243,165,232,50,69,198,224,233,180,127,133,165,192,55,68,202,201,84,121,179,133,207,64,43,228,172,96,124,94,218,125,252,197,109,54,87,2,57,37,65,64,12,114,112,202,57,218,40,92,58,221,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,76,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,218,0,0,0,0,0,0,0,0,0,0,0,0,0,246,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,0,0,0,0,0,0,0,0,0,0,185,0,0,0,0,247,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
                       
            // previous...
            /*            [157,191,232,48,167,41,45,248,148,141,182,184,100,252,240,199,242,14,188,237,205,200,73,165,15,20,72,193,196,171,101,28,14,200,148,251,235,50,224,247,34,251,61,126,92,32,55,170,43,65,40,114,253,229,76,209,236,228,16,94,68,134,142,241,27,213,164,14,159,194,211,181,117,97,230,155,92,39,168,100,155,26,142,133,119,67,14,163,248,150,71,187,141,46,66,79,141,210,60,76,203,193,73,7,57,109,159,16,42,103,161,68,184,50,116,19,31,171,45,71,176,186,34,236,19,234,164,6,72,63,40,21,39,82,129,18,24,38,122,9,175,56,221,77,75,253,28,242,107,64,48,31,48,221,122,115,15,164,150,242,110,65,128,161,117,58,183,222,192,146,163,52,56,26,206,32,232,220,132,230,46,206,3,97,85,167,58,124,53,191,32,55,112,43,115,127,218,200,4,150,195,143,205,67,128,222,120,175,1,31,207,165,49,39,165,178,10,147,209,195,138,221,125,1,104,141,65,27,44,131,176,74,152,113,49,60,167,173,67,67,238,236,178,9,175,88,42,239,163,132,154,38,72,252,195,211];
            */
        }
        else if ( i === PRESET_GENOTYPE_WALLACE )
        {
            _genes = [225,255,16,20,193,39,82,165,61,249,85,179,186,20,221,200,134,112,90,134,71,187,231,246,94,189,30,187,191,67,113,239,116,137,212,7,38,123,17,40,157,140,131,135,159,180,31,123,171,77,150,192,87,39,103,245,56,23,4,64,105,192,4,49,252,99,192,7,137,242,2,92,23,129,175,192,78,68,130,139,4,81,214,152,50,209,72,212,54,187,223,1,64,217,239,20,203,159,202,223,41,131,61,10,35,186,93,222,235,99,248,146,0,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,0,0,0,0,0,0,0,0,0,55,0,27,220,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,216,0,0,228,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0];            
            
            /*
            [117,40,99,96,7,180,190,117,87,232,6,168,83,48,202,171,208,112,31,99,138,17,48,20,126,186,129,107,225,210,21,89,147,244,150,220,216,210,135,221,184,142,221,107,128,184,68,168,201,36,16,47,66,249,153,246,62,253,58,118,0,154,57,61,185,234,77,141,170,238,62,220,0,11,41,221,29,105,220,51,187,55,147,209,49,74,145,112,126,108,98,252,11,105,62,77,221,46,240,234,59,106,31,8,160,16,28,14,155,15,38,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];        
            */
            /*
            [200,125,201,202,176,144,133,112,224,84,85,131,60,148,6,152,119,172,146,194,104,205,186,108,86,6,252,172,29,172,50,184,181,160,101,150,30,28,130,231,50,7,17,103,87,200,7,111,220,120,138,233,188,234,157,194,83,216,14,143,168,58,104,225,102,56,93,209,21,241,215,12,156,127,241,242,183,51,28,56,32,166,117,13,210,193,19,97,145,222,231,23,152,227,238,56,195,179,140,74,92,158,134,113,129,168,83,204,168,91,205,152,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,247,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  
            */
     
            //previous
            /*
            [131,167,210,41,139,159,161,137,34,163,228,245,144,62,33,94,118,244,172,92,55,201,151,131,24,250,217,133,87,214,170,232,195,236,88,111,160,103,128,57,93,180,13,139,136,126,26,153,71,135,25,186,178,61,130,213,252,118,87,17,107,22,49,212,237,156,186,168,221,10,228,149,149,195,254,89,166,110,34,59,13,161,154,139,150,252,181,121,94,72,247,125,32,78,112,61,123,182,85,187,163,146,136,149,117,42,187,150,196,245,208,188,252,147,247,64,248,243,188,96,27,100,188,144,142,108,125,51,20,51,55,234,179,209,200,5,220,84,1,7,129,5,218,183,160,128,137,110,247,56,57,199,228,46,5,181,166,160,237,207,179,36,189,87,58,178,215,227,175,190,128,233,79,179,25,164,175,199,109,175,204,67,92,119,131,93,192,177,181,86,162,138,99,103,244,46,134,244,79,8,207,64,97,206,17,60,174,247,181,11,6,149,83,107,146,98,104,179,105,71,175,40,217,58,183,93,184,228,104,157,172,232,57,65,196,38,176,248,195,231,99,227,200,174,52,184,214,31,196,185,100,178,104,47,2,95];
            */            
        }
        else if ( i === PRESET_GENOTYPE_MENDEL )
        {
            _genes = 
            [198,173,57,44,87,12,12,141,51,179,80,108,25,19,59,58,227,71,123,55,230,169,17,157,175,28,127,1,175,228,228,88,150,151,205,44,54,154,58,95,175,67,121,47,109,241,174,223,190,67,76,167,166,136,128,125,209,92,154,206,157,125,97,156,228,20,248,207,218,120,146,154,117,5,217,158,85,129,128,193,179,28,28,63,158,179,178,153,138,21,115,85,176,210,181,20,129,62,199,246,69,58,206,88,70,86,28,129,14,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            
            /*[170,44,7,64,235,214,205,52,136,157,245,156,254,24,26,154,254,25,176,62,128,0,18,121,204,144,210,184,82,21,136,146,153,30,75,157,227,63,131,196,139,149,216,222,194,129,213,93,114,41,242,248,244,103,122,214,217,190,165,240,208,232,58,16,232,130,254,106,234,43,92,87,115,107,108,175,141,227,67,167,208,166,34,252,24,201,214,109,101,200,137,47,253,171,107,164,96,195,56,50,221,147,129,50,25,180,116,71,121,180,98,40,0,0,29,0,0,0,0,0,170,168,0,0,0,0,0,0,0,0,176,0,0,0,0,0,0,28,0,0,0,0,0,0,0,55,0,0,0,0,0,0,0,0,0,0,0,0,29,0,60,0,0,0,0,37,0,0,0,0,0,0,0,0,0,0,0,98,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,0,125,0,138,0,0,0,0,0,238,0,0,0,0,0,0,0,0,0,0,0,36,250,59,0,0,0,0,233,0,0,0,0,0,0,0,0,0,0,0,239,0,0,0,0,115,48,0,0,0,0,0,0,231,0,0,0,0,0,240];
            */
            /*            [121,117,166,58,69,252,103,97,234,131,25,244,83,214,29,96,233,98,206,227,192,25,6,169,48,106,217,16,61,221,91,36,144,11,133,39,252,45,193,214,141,223,201,90,188,50,172,233,156,0,124,183,87,229,231,134,116,211,50,21,198,127,93,106,153,145,110,72,210,245,56,118,91,186,244,245,211,139,255,91,22,228,10,8,173,109,93,78,221,7,127,173,18,139,60,109,34,99,217,89,134,92,220,252,185,70,163,19,31,148,207,206,240,247,55,189,138,73,30,160,41,254,136,116,241,156,233,65,243,124,224,227,89,14,229,98,73,244,164,179,152,207,18,46,15,118,42,116,185,182,23,238,243,107,102,143,103,182,137,235,31,41,160,198,172,83,175,49,151,128,172,255,97,184,143,217,174,122,245,201,35,125,18,180,193,233,22,36,64,93,206,107,91,12,173,26,167,84,60,118,210,51,178,170,207,118,225,115,176,207,62,210,240,8,118,164,3,27,5,69,39,181,152,30,202,118,97,91,214,120,85,27,195,169,250,100,147,32,77,147,199,20,188,189,128,117,68,111,26,141,163,155,125,172,123,163];
            */
        }
        else if ( i === PRESET_GENOTYPE_TURING )
        {
            _genes =  
            [218,98,60,220,217,72,92,173,200,32,10,46,73,122,88,238,191,209,216,144,167,14,159,231,46,102,30,75,46,149,205,255,253,189,130,76,4,247,141,78,19,83,252,30,21,4,144,21,21,18,214,146,179,239,96,255,217,49,72,6,173,146,20,46,205,190,173,143,226,126,101,14,109,99,38,57,51,97,113,68,151,151,50,129,210,193,140,5,200,21,176,20,134,13,134,241,56,148,154,198,6,140,39,50,76,92,37,40,28,12,155,155,0,0,0,0,0,0,0,0,135,0,0,0,0,0,0,0,0,0,0,0,0,0,234,243,132,0,0,0,0,184,0,0,0,0,0,0,0,0,0,0,0,38,0,0,0,0,0,0,0,0,0,0,109,0,178,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,0,0,0,0,0,0,29,0,0,0,0,0,0,0,0,175,0,0,0,242,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39,0,0];
               
            /*        [243,182,66,88,250,28,29,11,166,30,41,14,97,20,149,135,177,92,107,52,188,211,221,195,113,158,85,85,79,157,126,247,199,197,118,113,220,202,3,160,200,10,226,152,123,41,186,44,52,137,162,130,128,39,84,241,73,110,246,109,25,72,21,101,168,170,172,80,91,40,27,42,92,114,67,81,213,83,70,14,109,148,6,228,82,8,85,198,228,84,36,138,157,228,55,254,212,152,119,90,187,150,27,108,204,255,174,186,167,141,3,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,244,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,250,0,0,0,0,0,0,0,111,0,0,0,0,0,0,0,0,0,0,0,84,17,0,0,0,0,0,0,16,0,6,0,0,0,0,0,0,0,0,208,0,3,0,0,0,0,0,0,0,0,0,127,0,0,0,0,245,86,0,0,81,0,0,0,0,0,0,0,0,0,24,0,0,0,0];
            */
            /*            [163,72,95,3,33,138,51,22,89,0,75,198,35,0,228,62,245,4,0,138,0,54,194,65,50,77,130,26,27,229,16,194,193,238,3,234,149,2,159,0,124,97,228,183,79,40,34,115,235,134,254,174,8,4,91,50,3,58,2,185,244,209,93,7,254,193,31,162,6,53,184,10,206,253,251,10,155,34,167,162,94,113,14,10,179,7,212,31,185,18,224,2,116,51,253,120,8,7,62,4,49,164,210,49,232,122,2,153,124,15,238,33,16,197,234,145,225,63,188,177,253,6,47,221,10,3,242,155,38,68,28,63,69,23,9,10,33,20,62,122,74,4,140,101,230,33,200,31,90,234,40,80,218,0,185,2,67,224,227,66,247,246,156,168,38,204,142,221,161,6,191,113,30,213,205,67,23,13,50,99,39,101,16,2,156,99,156,1,162,2,121,117,54,17,166,178,153,247,171,138,20,108,11,254,221,205,219,145,244,207,103,243,44,99,241,71,79,75,91,50,56,165,73,238,182,228,0,32,79,6,14,199,18,74,51,252,143,130,254,70,44,144,231,88,119,61,252,1,84,96,229,49,182,0,37,58];
            */
        }
        else if ( i === PRESET_GENOTYPE_MARGULIS )
        {
            _genes = 
            [179,142,165,61,72,193,176,10,42,236,27,231,248,14,217,241,130,170,157,216,239,7,76,234,191,81,221,243,127,96,107,97,191,101,18,205,63,215,116,108,229,64,105,89,121,14,54,225,132,74,120,152,133,110,16,51,74,255,206,80,47,174,72,187,209,126,12,41,249,246,221,86,62,22,2,36,160,157,138,255,60,101,189,212,208,227,213,144,210,51,64,157,238,66,17,99,57,171,135,161,136,156,202,121,111,56,212,6,243,89,236,239,0,0,0,0,0,0,195,80,0,0,0,0,0,0,118,0,188,0,0,0,0,0,0,215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,0,0,0,19,0,0,0,0,35,0,0,0,0,0,0,0,0,0,240,0,231,0,0,146,213,0,0,0,0,0,0,0,0,0,0,0,0,183,0,194,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,0,251,0,0,0,0,0,0,0,0,0,0,0,17,0,234,0,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,0];
                     
            /*
            [170,44,7,64,235,214,205,52,136,157,245,156,84,24,26,154,254,25,176,62,128,0,18,121,204,144,210,184,82,21,140,146,153,30,75,157,227,63,131,196,139,149,216,222,194,129,213,93,114,41,242,248,244,103,122,28,217,190,165,240,59,232,58,16,232,130,254,106,234,52,92,87,115,107,108,175,141,227,67,167,208,166,34,252,24,201,214,102,101,200,137,220,253,171,107,164,96,195,56,50,221,147,129,50,25,180,116,71,121,180,98,40,0,0,29,0,43,0,0,0,170,168,0,0,19,0,0,0,0,0,176,0,0,0,0,0,0,28,0,0,0,0,0,0,0,55,0,0,0,0,0,0,0,0,14,0,0,0,29,0,60,0,0,0,0,37,0,0,0,0,0,0,207,0,0,201,0,98,0,0,0,147,0,0,0,0,0,0,0,0,0,121,0,0,0,170,0,125,0,239,0,0,0,0,0,238,0,0,17,0,0,0,0,0,0,0,0,36,200,59,0,0,0,0,233,0,0,0,87,251,0,0,0,219,0,0,239,0,0,0,0,115,48,0,0,0,132,0,0,231,246,0,0,0,0,240];
            */
            /*            [105,201,49,238,245,97,7,214,163,10,84,150,197,250,251,240,156,194,249,16,240,177,173,91,152,71,71,169,42,6,230,13,17,165,117,239,99,51,115,174,98,251,42,48,174,115,82,76,148,44,105,186,213,153,3,90,140,168,71,180,185,156,164,23,162,203,224,229,3,168,177,245,109,132,48,148,227,101,244,231,143,108,149,176,2,124,211,245,102,207,208,13,75,187,8,0,27,24,89,30,194,117,56,138,107,9,86,191,183,185,12,201,94,170,159,144,81,230,133,82,87,59,4,232,92,199,109,5,73,147,163,127,98,99,12,164,84,235,213,79,204,27,169,230,80,90,224,9,130,199,123,3,144,215,242,16,151,64,204,78,188,181,84,83,158,134,244,19,122,175,252,176,189,28,79,137,253,215,117,48,149,102,14,228,224,49,170,191,52,38,243,33,90,130,48,99,211,144,30,220,98,114,131,179,113,242,161,23,195,44,76,144,113,143,162,173,183,10,155,234,83,147,76,28,50,11,2,97,75,156,5,103,246,191,54,87,44,80,211,92,10,183,247,30,147,114,84,163,245,190,163,106,178,111,136,104];
            */
        }
        else if ( i === PRESET_GENOTYPE_WILSON )
        {
            _genes =      

[155,181,"0",238,176,1,41,250,8,149,9,250,143,79,77,91,51,39,250,63,30,157,250,162,170,162,255,148,46,"0",193,248,132,25,44,114,29,187,174,254,92,45,197,212,115,204,100,239,41,64,32,225,164,196,99,203,"0",205,29,105,17,4,215,9,243,5,80,87,203,114,227,212,99,253,135,233,134,188,145,45,250,196,113,154,162,45,11,154,121,46,240,102,101,126,80,88,55,219,40,240,7,107,151,89,170,172,175,152,101,156,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,228,0,0,0,0,0,0,0,0,0,0,0,148,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,0,0,0,0,0,0,0,0,0,24,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,228,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,0,0,0,0,0,0,0,0,0,0,0,0,0,250,0,3,0,0,0,0,0,0,0,0,0,0,0,0,242,0];            
            
            /*       [81,129,77,180,29,148,75,139,190,102,212,135,45,25,226,77,214,21,165,240,109,94,99,209,165,237,233,166,75,218,86,77,78,44,128,1,72,44,191,65,182,162,11,50,103,142,45,130,52,185,222,160,147,161,45,134,56,248,106,135,57,124,224,33,200,208,47,25,27,45,15,22,162,96,157,115,27,185,34,138,233,196,205,85,221,233,167,90,132,48,217,117,114,194,164,96,42,85,85,154,204,179,37,10,113,76,162,21,7,215,229,70,0,0,0,0,0,0,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,0,0]; 
            */
            
            /*            [120,105,241,1,183,93,70,141,7,30,190,241,5,252,239,106,50,107,211,72,252,149,126,94,121,122,150,244,231,135,204,216,18,198,216,56,243,82,102,138,43,53,93,152,186,158,213,52,211,204,186,132,237,108,191,109,104,35,30,228,108,34,45,213,233,10,20,53,20,235,180,48,190,79,178,60,118,52,194,109,249,223,94,162,234,220,235,129,61,109,249,177,178,69,235,209,214,122,135,82,130,182,231,164,3,19,205,65,69,90,209,237,179,121,8,68,55,140,202,159,108,178,250,93,210,244,123,156,173,146,100,57,85,7,97,239,186,129,176,40,183,63,188,137,129,51,177,7,208,118,175,151,162,240,121,106,130,104,199,208,116,110,8,75,185,233,236,186,99,164,148,88,41,69,149,27,50,163,171,139,31,168,197,94,254,22,185,211,210,220,153,239,67,94,98,190,53,92,36,171,60,221,100,21,233,74,66,199,84,208,2,52,164,88,63,245,212,41,172,149,128,219,211,156,55,100,219,30,78,249,234,46,208,204,246,89,71,145,137,126,114,154,63,171,173,68,49,121,31,207,68,39,171,34,32,33];
            */
        }
        else if ( i === PRESET_GENOTYPE_DAWKINS )
        {
            _genes = [225,172,222,194,35,75,132,158,25,62,15,108,50,126,137,106,112,230,90,58,67,180,141,167,24,244,77,222,209,84,107,204,142,164,197,47,16,13,241,199,241,30,224,216,7,26,0,167,130,101,30,55,219,1,165,188,177,100,67,206,216,161,28,88,150,224,237,255,192,239,230,127,30,159,58,149,140,35,76,79,108,221,233,9,61,14,200,101,124,199,127,47,82,242,176,123,31,19,180,245,247,73,127,243,18,25,128,7,213,69,33,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            /*  
            [155,181,234,138,176,186,41,250,36,149,9,250,133,148,115,82,6,211,20,191,244,65,50,125,97,68,48,97,225,165,127,248,132,77,223,73,212,64,178,150,205,124,118,79,125,102,209,194,7,64,32,225,164,161,99,78,133,205,29,88,91,233,148,83,113,224,147,215,203,114,227,212,99,253,162,19,127,148,137,155,109,0,209,99,2,106,184,248,178,66,240,102,98,126,244,88,16,219,40,240,81,162,8,114,216,83,30,56,250,19,75,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,92,0,168,208,102,0,0,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,193,0,59,0,0,200,0,0,0,241,195,0,249,0,0,0,252,0,0,0,0,0,0,0,0,0,24,0,0,0,12,0,0,63,0,0,0,0,209,0,0,0,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,221,0,0,0,0,23,0,4,0,31,0,0,0,0,201,0,239,0,0,230,0,252,52,0,0,0,0,255,0,0,0,0,52,0];
            */
            
            /*
            [125,176,90,108,164,148,75,139,51,121,25,8,189,153,9,99,214,21,193,142,153,130,1,177,182,122,101,117,17,125,47,108,1,205,49,166,94,14,209,84,50,160,184,118,100,113,80,197,52,190,158,188,131,126,109,138,42,116,147,209,149,141,8,98,72,123,147,136,165,15,47,117,133,243,13,36,65,106,171,30,242,74,73,0,172,179,136,81,92,59,48,91,214,58,131,96,87,85,35,252,208,168,37,27,245,161,37,11,128,146,233,169,0,0,0,0,0,0,0,0,6,0,0,41,0,0,0,0,0,0,0,0,142,0,0,0,0,0,0,0,0,0,0,203,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,249,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,102,0,0,0,0,0,0,194,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,58,0,22,0,0,0,0,0,0,0,0,0,0,169];
            */            
            
            /*
            [175,70,80,150,20,80,150,20,255,80,100,0,226,18,153,215,75,123,192,95,0,0,87,100,9,200,0,255,100,80,150,20,80,150,20,160,80,100,200,125,189,21,8,204,8,66,31,0,0,180,100,0,0,4,255,100,80,150,20,80,150,20,160,36,107,200,129,242,254,217,32,106,110,189,253,0,180,100,0,0,0,255,100,0,0,0,0,99,0,0,25,0,0,132,0,0,0,0,0,0,0,0,0,0,0,244,0,0,0,0,0,0,0,0,0,0,0,0,0,0,174,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,243,0,0,0,0,0,150,0,0,0,0,0,0,0,0,0,0,0,123,0,0,0,0,205,0,0,0,231,0,0,0,0,0,0,0,0,0,41,135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,0,0,0,0,0,0,0,185,0,0,108,0,61,0,0,0,0,0];
            */
        }        
        else if ( i === PRESET_GENOTYPE_DENNETT )
        {
            _genes =             
[218,98,"225",220,217,72,92,173,200,32,10,46,73,122,88,238,191,209,216,144,167,14,159,231,46,102,30,"255",46,"223","244","107",253,189,130,76,4,247,141,78,19,83,252,30,21,4,144,21,21,18,214,146,179,239,"255",255,217,49,"0",6,173,146,20,46,205,190,173,143,226,126,101,14,109,99,38,57,51,97,113,68,151,151,50,129,210,193,140,5,200,21,176,20,134,13,134,241,56,148,154,198,6,140,39,50,76,92,37,40,28,12,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            /*[105,201,49,238,245,97,7,214,163,10,84,150,197,250,251,240,156,194,249,16,240,177,173,91,152,71,71,169,42,6,230,13,17,165,117,239,99,51,115,174,98,251,42,48,174,115,82,76,148,44,105,186,213,153,3,90,140,168,71,180,185,156,164,23,162,203,224,229,3,168,177,245,109,132,48,148,227,101,244,231,143,108,149,176,2,124,211,245,102,207,208,13,75,187,8,0,27,24,89,30,194,117,56,138,107,9,86,191,183,185,12,201,94,170,159,144,81,230,133,82,87,59,4,232,92,199,109,5,73,147,163,127,98,99,12,164,84,235,213,79,204,27,169,230,80,90,224,9,130,199,123,3,144,215,242,16,151,64,204,78,188,181,84,83,158,134,244,19,122,175,252,176,189,28,79,137,253,215,117,48,149,102,14,228,224,49,170,191,52,38,243,33,90,130,48,99,211,144,30,220,98,114,131,179,113,242,161,23,195,44,76,144,113,143,162,173,183,10,155,234,83,147,76,28,50,11,2,97,75,156,5,103,246,191,54,87,44,80,211,92,10,183,247,30,147,114,84,163,245,190,163,106,178,111,136,104];
            */
            
            /*
            [239,132,90,192,183,6,78,77,93,178,73,216,43,218,29,93,84,72,5,127,211,76,175,226,225,18,108,138,132,180,170,84,241,67,215,240,146,245,37,99,170,16,236,128,5,116,14,16,222,214,94,119,85,217,17,199,102,153,248,221,81,75,94,8,238,145,242,25,19,11,224,84,212,70,87,175,82,114,77,41,130,42,50,93,25,226,176,170,101,15,255,188,110,73,24,240,150,228,226,192,82,114,52,134,22,66,254,94,156,198,211,170,250,169,33,126,49,116,233,62,144,221,147,185,171,69,154,187,234,148,176,227,173,168,165,74,191,10,25,98,81,141,39,31,155,147,211,242,157,179,57,75,17,140,202,52,230,174,136,120,23,209,168,11,192,33,134,133,235,122,92,237,147,186,132,192,141,57,63,224,111,199,129,200,66,100,19,76,173,84,191,254,149,106,91,60,156,114,68,208,5,228,200,1,38,64,239,169,68,77,162,119,163,25,161,45,133,16,74,156,129,194,225,78,212,172,28,49,6,63,82,94,10,68,176,82,20,150,54,81,96,215,173,15,196,159,194,205,200,36,148,194,68,21,150,198];
            */
        }              
    }

//use this...
/*        

*/        
        
    //--------------------------------------------------------
	this.setAsOffspring = function( parent_0, parent_1 )
	{ 	
	    //console.log( parent_0 );
	    //console.log( parent_1 );
	    
	    /*
	    console.log( "----------------------------");
	    console.log( "setAsOffspring");
	    console.log( "----------------------------");

        for (let g=0; g<NUM_GENES; g++)
        {
            console.log( parent_0.genes[g] + ", " + parent_1.genes[g] );
        }
	    */
	    
        //-------------------------------------------
        // start with random parent either 1 or 2
        //-------------------------------------------
        let parent = 0;
        if ( gpRandom() < ONE_HALF )
        {
            parent = 1;
        }

        //-------------------------------------------
        // scan genes
        //-------------------------------------------
        for (let g=0; g<NUM_GENES; g++ )
        {
            //-----------------------------------
            // crossover - switch to other parent 
            //-----------------------------------
            if ( gpRandom() < CROSSOVER_RATE )
            {
                if ( parent === 0 )
                {
                    parent =  1;
                }
                else 
                {
                    parent = 0;
                }
            }

            //-----------------------------------
            // copy parent gene to child gene 
            //-----------------------------------
            if ( parent === 0 ) 
            {
                assert ( parent_0.getGeneValue(g) >= 0,         "Genotype: setAsOffspring: parent_0.getGeneValue(g) >= 0" );
                assert ( parent_0.getGeneValue(g) < BYTE_SIZE,  "Genotype: setAsOffspring: parent_0.getGeneValue(g) < BYTE_SIZE" );
                assertInteger( parent_0.getGeneValue(g),        "Genotype: setAsOffspring: assertInteger: parent_0.getGeneValue(g)" );	

                _genes[g] = parent_0.getGeneValue(g);
            }
            else 
            {
                assert ( parent_1.getGeneValue(g) >= 0,         "Genotype: setAsOffspring: parent_1.getGeneValue(g) >= 0" );
                assert ( parent_1.getGeneValue(g) < BYTE_SIZE,  "Genotype: setAsOffspring: parent_1.getGeneValue(g) < BYTE_SIZE" );
                assertInteger( parent_1.getGeneValue(g),        "Genotype: setAsOffspring: assertInteger: parent_1.getGeneValue(g)" );	
                
                _genes[g] = parent_1.getGeneValue(g);
            }
            
            assertInteger( _genes[g], "Genotype: setAsOffspring: assertInteger: _genes[g]" );	

            //-----------------------------------
            // mutation
            //-----------------------------------
            if ( gpRandom() < MUTATION_RATE ) 
            {
                this.mutateGene(g);
            }
      
            assert ( _genes[g] >= 0, "_genes[g] >=   0" );
            assert ( _genes[g] < BYTE_SIZE, "_genes[g] < BYTE_SIZE" );
            assertInteger( _genes[g], "Genotype: setAsOffspring: AFTER MUTATION...assertInteger: _genes[g]" );	
        }
    }
     

   
    //-----------------------------
	this.mutateGene = function(g)
	{	
        assertInteger( _genes[g], "Genotype: at the start of mutateGene" );
        	
        assert ( _genes[g] >= 0, "mutateGene: _genes[g] >=   0" );
        assert ( _genes[g] < BYTE_SIZE, "mutateGene: _genes[g] < BYTE_SIZE" );
 	

	    //console.log( "mutate gene " + g );
	    
        let amplitude = Math.floor( gpRandom() * gpRandom() * BYTE_SIZE );
        //console.log( "amplitude = " + amplitude );
    
        //-------------------------------------
        // keep it an integer!!!
        //-------------------------------------
        amplitude = Math.round( amplitude );

        assert( amplitude >= 0, "mutateGene:amplitude >= 0" );
        assert( amplitude < BYTE_SIZE, "mutateGene:amplitude < BYTE_SIZE" );

        if ( gpRandom() > ONE_HALF )
        {
            let before = _genes[g];
            _genes[g] += amplitude;
            
            if ( _genes[g] >= BYTE_SIZE ) 
            {
                _genes[g] -= BYTE_SIZE;
            }
            
            //console.log( "gene " + g + " mutated by " + amplitude + "; the value changed from " + before + " to " + _genes[g] );
        }
        else 
        {
            _genes[g] -= amplitude;

            if ( _genes[g] < 0 ) 
            {
                _genes[g] += BYTE_SIZE;
            }
        }

	
        assertInteger( _genes[g], "Genotype: mutateGene" );	
	
        
        assert ( _genes[g] >= 0, "Genotype: mutateGene:_genes[g] >=   0" );
        assert ( _genes[g] < BYTE_SIZE, "Genotype: mutateGene:_genes[g] < BYTE_SIZE" );
    }

   
    //-----------------------------
	this.zap = function( amount )
	{ 
        for (let g=0; g<NUM_GENES; g++ )
        {
            if ( gpRandom() < amount )
            {
                this.mutateGene(g);
            }
        }
    }
}


 
 