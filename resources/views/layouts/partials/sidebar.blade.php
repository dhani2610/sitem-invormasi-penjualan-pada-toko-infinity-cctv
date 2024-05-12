<!-- ========== Left Sidebar Start ========== -->
<style>
span{
    color: black;
}
#sidebar-menu{
    background: silver;
}
.simplebar-content-wrapper{
    background: silver!important;
}
</style>
<div class="vertical-menu">

    <div data-simplebar class="h-100">

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu" style="background:silver">
                @if(auth()->user()->can('dashboard') || auth()->user()->can('master-data') || auth()->user()->can('history-log-list'))
                <li class="menu-title" key="t-menu">Menu</li>
                @endif

                @if(auth()->user()->can('dashboard'))
                <li>
                    <a href="{{ route('dashboard.index') }}" class="waves-effect">
                        <i class="bx bx-home-circle"></i>
                        <span key="t-dashboards">Dashboard</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('master-pelanggan'))
                <li>
                    <a href="{{ route('pelanggan-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Pelanggan</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('master-barang'))
                <li>
                    <a href="{{ route('barang-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Barang</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('master-barang'))
                <li>
                    <a href="{{ route('barang-masuk-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Barang Masuk</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('master-kategori'))
                <li>
                    <a href="{{ route('kategori-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Kategori</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('master-petugas'))
                <li>
                    <a href="{{ route('petugas-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Petugas</span>
                    </a>
                </li>
                @endif

                @if(auth()->user()->can('transaksi'))
                <li>
                    <a href="{{ route('transaksi-list') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Transaksi Penjualan</span>
                    </a>
                </li>
                @endif


                @if(auth()->user()->can('report'))
                    <li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="mdi mdi-folder-outline"></i>
                            <span key="t-dashboards">Laporan</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li><a href="{{ route('laporan-barang-masuk') }}" key="t-default">Laporan Barang Masuk</a></li>
                            <li><a href="{{ route('laporan-penjualan') }}" key="t-default">Laporan Penjualan</a></li>
                            <li><a href="{{ route('laporan-stok') }}" key="t-saas">Laporan Stok Barang</a></li>
                            <li><a href="{{ route('laporan-pelanggan') }}" key="t-crypto">Laporan Pelanggan</a></li>
                            <li><a href="{{ route('laporan-grafik') }}" key="t-crypto">Laporan Grafik Penjualan</a></li>
                        </ul>
                    </li>
                @endif


                @if(auth()->user()->can('master-data'))
                <li>
                    <a href="{{ route('master-data.index') }}">
                        <i class="mdi mdi-folder-outline"></i>
                        <span data-key="t-dashboard">Master Data</span>
                    </a>
                </li>
                @endif
         
                <li>
                    <form action="{{ url('/logout') }}" method="post">
                        @csrf
                        <button type="submit" class="btn"> 
                            <i class="mdi mdi-logout"></i>
                            <span data-key="t-dashboard">Logout</span>
                        </button>
                    </form>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->