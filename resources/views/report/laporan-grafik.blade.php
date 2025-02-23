@extends('layouts.app')

@section('style')
<link rel="stylesheet" href="{{ asset('plugins/datepicker/bootstrap-datepicker3.min.css') }}">

<style>
@use postcss-color-function;
@use postcss-nested;
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');
<style>
       .master-data {
           cursor: pointer;
       }

       .master-data:hover {
            box-shadow: 0px 0px 33px -14px rgba(0,0,0,0.75);
            -webkit-box-shadow: 0px 0px 33px -14px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 33px -14px rgba(0,0,0,0.75);
            border-right: 4px solid rgb(0, 98, 128);";
       }
       .info-box {
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.125), 0 1px 3px rgba(0, 0, 0, 0.2);
            border-radius: 0.50rem;
            background-color: #fff;
            display: -ms-flexbox;
            display: flex;
            margin-bottom: 1rem;
            min-height: 80px;
            position: relative;
            width: 100%;
        }

        .info-box .info-box-icon {
            border-radius: 0.50rem 0 0 0.50rem;
            -ms-flex-align: center;
            align-items: center;
            display: -ms-flexbox;
            display: flex;
            font-size: 1.875rem;
            -ms-flex-pack: center;
            justify-content: center;
            text-align: center;
            width: 70px;
        }

        .info-box .info-box-icon > img {
            max-width: 100%;
        }

        .info-box .info-box-content {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            -ms-flex-pack: center;
            justify-content: center;
            line-height: 1.8;
            -ms-flex: 1;
            flex: 1;
            padding: 0 15px;
        }
</style>
@endsection

@section('breadcumb')
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">{{ ($breadcumb ?? '') }}</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">home</li>
                        <li class="breadcrumb-item">/</li>              
                        <li class="breadcrumb-item active"><a href="{{ route('dashboard.index') }}">{{ ($breadcumb ?? '') }}</a></li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    
@endsection

@section('content')

<div class="row mt-4">
    <div class="col-lg-12 col-md-6">
        <form action="" method="get">
            <div class="d-flex flex-nowrap bd-highlight">
                    @csrf
                  
                    <div class="order-3 p-2 bd-highlight">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
               
                    <div class="order-1 p-2 bd-highlight">
                        <input type="month" class="form-control" name="start_date" value="{{ Request::get('start_date') }}">
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div id="chart"></div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
</div>

@endsection

@section('script')
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>


<script>
const chart = Highcharts.chart('chart', {
    title: {
        text: 'Total Transakai',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: {
        categories: @json($date)
    },
    series: [{
        type: 'column',
        name: 'Transaksi',
        colorByPoint: true,
        data: @json($total_transaksi),
        showInLegend: false
    }]
});

document.getElementById('plain').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: false,
            polar: false
        },
        subtitle: {
            text: 'Chart option: Plain | Source: ' +
                '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
                'target="_blank">NAV</a>'
        }
    });
});

document.getElementById('inverted').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: 'Chart option: Inverted | Source: ' +
                '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
                'target="_blank">NAV</a>'
        }
    });
});

document.getElementById('polar').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: false,
            polar: true
        },
        subtitle: {
            text: 'Chart option: Polar | Source: ' +
                '<a href="https://www.nav.no/no/nav-og-samfunn/statistikk/arbeidssokere-og-stillinger-statistikk/helt-ledige"' +
                'target="_blank">NAV</a>'
        }
    });
});

</script>


@endsection