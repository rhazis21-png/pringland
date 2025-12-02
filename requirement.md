# Requirements Document

## Introduction

Pring Land Digital Platform adalah sistem web interaktif untuk menampilkan dan mengelola inventori lahan dari tiga kawasan farm estate: Borneo Food Estate (11 Ha, Grid Layout), Jogja Integrated Farm (Linear Layout), dan Patuk Hillside (Contour Layout). Platform ini memfasilitasi investor untuk melihat ketersediaan unit, marketing untuk presentasi sales, dan superadmin untuk manajemen status unit secara real-time.

## Glossary

- **System**: Pring Land Digital Platform
- **Interactive Map**: Komponen peta interaktif yang menampilkan unit-unit lahan dengan status real-time
- **Unit**: Kavling lahan individual yang dapat dibeli/dibooking
- **Cluster/Block**: Zona besar yang mengelompokkan beberapa unit (contoh: Blok A Ayam, Blok B Bebek)
- **Masterplan View**: Tampilan peta global kawasan yang menampilkan zona-zona besar
- **Detail Unit View**: Tampilan detail yang menampilkan unit-unit individual dalam satu cluster
- **Hierarchical Zooming System**: Sistem navigasi bertingkat dari masterplan ke detail unit
- **Adaptive Rendering Engine**: Mesin rendering yang menyesuaikan metode tampilan berdasarkan tipe proyek
- **Grid Layout**: Tata letak unit dalam bentuk baris x kolom (untuk Borneo)
- **Linear Layout**: Tata letak unit memanjang horizontal (untuk Jogja)
- **Curved/Contour Layout**: Tata letak unit melengkung mengikuti kontur bukit (untuk Patuk)
- **Canvas Editor**: Interface admin untuk manajemen visual unit dengan drag selection
- **Investor**: Pengguna publik yang mencari informasi investasi lahan
- **Marketing Agent**: Sales agent yang menggunakan platform sebagai sales aid tool
- **Superadmin**: Pengelola sistem yang memiliki akses penuh untuk update status unit dan manajemen akun marketing
- **Marketing Account**: Akun yang dibuat oleh Superadmin untuk Marketing Agent dengan kredensial login dan hak akses untuk mengelola project
- **Project**: Kawasan farm estate yang memiliki masterplan dan unit-unit (contoh: Borneo, Jogja, Patuk)
- **Block Element**: Elemen visual di canvas editor yang merepresentasikan cluster/zona (contoh: Blok A Ayam, Blok B Bebek)
- **Facility Element**: Elemen visual di canvas editor yang merepresentasikan fasilitas (contoh: Office, Warehouse, Shopping Gallery, Pos Security, Parking Area)
- **Unit Element**: Elemen visual di canvas editor yang merepresentasikan kavling individual yang dapat dijual
- **Status Available**: Unit tersedia untuk dibeli (warna putih)
- **Status Booking/Keep**: Unit sedang dalam proses booking (warna kuning)
- **Status Sold**: Unit sudah terjual (warna merah)
- **SPJK**: Surat Pemesanan Jual Kavling
- **CRM Lite**: Fitur pencatatan data pembeli sederhana

## Requirements

### Requirement 1

**User Story:** Sebagai investor, saya ingin memilih proyek farm estate yang saya minati, sehingga saya dapat melihat siteplan yang sesuai dengan lokasi pilihan saya.

#### Acceptance Criteria

1. WHEN the System loads THEN the System SHALL display a project selection interface showing three options: Borneo Food Estate, Jogja Integrated Farm, and Patuk Hillside
2. WHEN an Investor clicks on a project option THEN the System SHALL navigate to the Interactive Map for that specific project
3. WHEN the System displays a project option THEN the System SHALL show the project name, total area, and total units available
4. WHEN an Investor selects Borneo Food Estate THEN the System SHALL load the Grid Layout rendering mode
5. WHEN an Investor selects Jogja Integrated Farm THEN the System SHALL load the Linear Layout rendering mode
6. WHEN an Investor selects Patuk Hillside THEN the System SHALL load the Curved Layout rendering mode

### Requirement 2

**User Story:** Sebagai investor, saya ingin melihat masterplan global kawasan terlebih dahulu, sehingga saya dapat memahami struktur zona dan memilih area yang menarik bagi saya.

#### Acceptance Criteria

1. WHEN an Investor enters a project THEN the System SHALL display the Masterplan View in read-only mode showing all clusters and blocks as configured in Canvas Editor
2. WHEN the System displays Masterplan View THEN the System SHALL render all Block Elements, Facility Elements, and decoration elements from project configuration without edit capabilities
3. WHEN the System displays Masterplan View THEN the System SHALL show real-time booking status colors (white/yellow/red) on blocks that contain units
4. WHEN the System displays Masterplan View for Borneo THEN the System SHALL show Blok A (left side) and Blok B (right side) with commodity zones labeled
5. WHEN the System displays Masterplan View for Jogja THEN the System SHALL show Blok A Ayam, Blok B Bebek, and facility areas (Pos Security, Parking, Office, Warehouse, Shopping Gallery)
6. WHEN the System displays Masterplan View for Patuk THEN the System SHALL show Blok A Ayam (lower/valley area) and Blok B Bebek (upper/peak area) with curved layout
7. WHEN an Investor clicks on a cluster or block in Masterplan View THEN the System SHALL zoom into Detail Unit View for that specific cluster
8. WHEN a Superadmin creates new project with custom layout THEN the System SHALL automatically generate Masterplan View based on Canvas Editor configuration
9. WHEN an Investor attempts to drag or edit elements in Masterplan View THEN the System SHALL prevent any modifications and maintain view-only mode

### Requirement 3

**User Story:** Sebagai investor, saya ingin melihat detail unit-unit dalam satu cluster dengan layout yang sesuai karakteristik lahan, sehingga unit terlihat jelas dan mudah dipilih di layar HP saya.

#### Acceptance Criteria

1. WHEN the System displays Detail Unit View for Borneo THEN the System SHALL render units in Grid Layout with rows and columns
2. WHEN the System displays Detail Unit View for Jogja THEN the System SHALL render units in Linear Layout with horizontal scroll capability
3. WHEN the System displays Detail Unit View for Patuk THEN the System SHALL render units in Curved Layout following contour lines using SVG paths or CSS transforms
4. WHEN the System renders a unit THEN the System SHALL display the unit number clearly visible on mobile screen
5. WHEN the System renders units in a cluster THEN the System SHALL apply color coding based on commodity type or livestock type
6. WHEN the System renders units for Borneo THEN the System SHALL use green for Sawi/Kangkung, purple for Terong, orange for Tomat, and red for Cabai
7. WHEN the System renders units for Jogja or Patuk THEN the System SHALL use navy blue for Ayam blocks and deep purple/magenta for Bebek blocks

### Requirement 4

**User Story:** Sebagai investor, saya ingin melihat status ketersediaan setiap unit secara real-time, sehingga saya tahu unit mana yang masih bisa saya beli.

#### Acceptance Criteria

1. WHEN the System displays a unit with Available status THEN the System SHALL render the unit with white color overlay
2. WHEN the System displays a unit with Booking/Keep status THEN the System SHALL render the unit with yellow color overlay
3. WHEN the System displays a unit with Sold status THEN the System SHALL render the unit with red color overlay
4. WHEN an Investor clicks on a unit with Available status THEN the System SHALL allow the interaction and show unit details
5. WHEN an Investor clicks on a unit with Booking or Sold status THEN the System SHALL prevent interaction or show information-only mode
6. WHEN the Superadmin updates a unit status in Admin Dashboard THEN the System SHALL update the unit display on public web in real-time

### Requirement 5

**User Story:** Sebagai investor, saya ingin melakukan booking unit yang tersedia melalui WhatsApp, sehingga saya dapat langsung berkomunikasi dengan tim sales Pring Land.

#### Acceptance Criteria

1. WHEN an Investor clicks on an Available unit THEN the System SHALL display a sticky footer with "Booking Unit [Unit Number]" button
2. WHEN an Investor clicks the booking button THEN the System SHALL redirect to WhatsApp with pre-filled message
3. WHEN the System generates WhatsApp message for Borneo unit THEN the System SHALL include format "Halo, saya mau booking kavling [Commodity] [Unit Number] di Pring Land Borneo"
4. WHEN the System generates WhatsApp message for Jogja unit THEN the System SHALL include format "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Jogja"
5. WHEN the System generates WhatsApp message for Patuk unit THEN the System SHALL include format "Halo, saya mau booking unit [Livestock Type] [Unit Number] di Pring Land Patuk"
6. WHEN the System redirects to WhatsApp THEN the System SHALL use the official Pring Land WhatsApp number

### Requirement 6

**User Story:** Sebagai marketing agent, saya ingin login ke sistem dengan akun yang diberikan admin, sehingga saya dapat mengakses fitur tambahan untuk mendukung pekerjaan sales saya.

#### Acceptance Criteria

1. WHEN a Marketing Agent accesses the marketing login page THEN the System SHALL display login form with email and password fields
2. WHEN a Marketing Agent enters valid credentials THEN the System SHALL authenticate and redirect to Marketing Dashboard
3. WHEN a Marketing Agent enters invalid credentials THEN the System SHALL display error message and prevent access
4. WHEN a Marketing Agent successfully logs in THEN the System SHALL maintain the session until logout or timeout
5. WHEN a Marketing Agent accesses the public web without login THEN the System SHALL provide the same Interactive Map view as Investors

### Requirement 6A

**User Story:** Sebagai marketing agent yang sudah login, saya ingin melakukan booking unit langsung dari sistem dengan data lengkap klien, sehingga saya dapat mengamankan unit dan menyimpan dokumen penting dengan cepat.

#### Acceptance Criteria

1. WHEN a Marketing Agent logs in and views Interactive Map THEN the System SHALL enable booking mode on all Available units
2. WHEN a Marketing Agent clicks on an Available unit THEN the System SHALL display modal form with fields: Nomor Unit (auto-filled), Nama Calon Pembeli, Nomor HP, Upload KK (file), Upload KTP (file), and Catatan (optional)
3. WHEN a Marketing Agent uploads KK file THEN the System SHALL accept image formats (JPG, PNG, PDF) with maximum size 5MB
4. WHEN a Marketing Agent uploads KTP file THEN the System SHALL accept image formats (JPG, PNG, PDF) with maximum size 5MB
5. WHEN a Marketing Agent submits booking form with valid data THEN the System SHALL upload files to Supabase Storage and change unit status to Booking (yellow)
6. WHEN the System stores booking data THEN the System SHALL include: marketing agent name (from login session), nomor unit, nama calon pembeli, nomor HP, KK file URL, KTP file URL, catatan, and timestamp
7. WHEN a Marketing Agent successfully books a unit THEN the System SHALL display success notification "Unit [Unit Number] berhasil dibooking"
8. WHEN the System updates unit to Booking status THEN the System SHALL reflect the change in real-time on public web with yellow color
9. WHEN a Marketing Agent views a Booked unit that they created THEN the System SHALL display "View Details" and "Cancel Booking" buttons
10. WHEN a Marketing Agent clicks "View Details" on their booked unit THEN the System SHALL display modal showing all booking data including downloadable KK and KTP files
11. WHEN a Marketing Agent clicks "Cancel Booking" THEN the System SHALL display warning dialog "Apakah Anda yakin ingin membatalkan booking unit ini? Unit akan kembali tersedia untuk umum"
12. WHEN a Marketing Agent confirms cancellation THEN the System SHALL change unit status back to Available (white), remove booking data, but keep files in storage for audit trail
13. WHEN a Marketing Agent attempts to cancel booking created by another marketing agent THEN the System SHALL prevent cancellation and display message "Anda tidak dapat membatalkan booking yang dibuat oleh marketing lain"
14. WHEN a Marketing Agent displays the Interactive Map on tablet or mobile device THEN the System SHALL render the map optimized for touch interactions with booking capabilities

### Requirement 6B

**User Story:** Sebagai marketing agent, saya ingin melihat dashboard yang menampilkan semua booking saya, sehingga saya dapat melacak progress dan mengelola pipeline sales dengan efektif.

#### Acceptance Criteria

1. WHEN a Marketing Agent logs in THEN the System SHALL display Marketing Dashboard as landing page
2. WHEN the System displays Marketing Dashboard THEN the System SHALL show summary cards: Total Bookings, Total Sold, and Pending Bookings
3. WHEN the System displays Marketing Dashboard THEN the System SHALL show table of all bookings created by that marketing agent
4. WHEN the System displays booking table THEN the System SHALL show columns: Nomor Unit, Project Name, Nama Calon Pembeli, Nomor HP, Status (Booking/Sold), Tanggal Booking, and Actions
5. WHEN a Marketing Agent clicks on a booking row THEN the System SHALL display detail modal with all booking information and downloadable documents
6. WHEN a Marketing Agent filters bookings by status THEN the System SHALL display only bookings matching the selected status
7. WHEN a Marketing Agent searches by unit number or client name THEN the System SHALL filter the booking table in real-time
8. WHEN a Marketing Agent sorts table by column THEN the System SHALL reorder bookings accordingly

### Requirement 6C

**User Story:** Sebagai marketing agent, saya ingin mengupdate status booking menjadi sold ketika deal closing, sehingga unit tercatat sebagai terjual dan saya dapat input data pembeli final.

#### Acceptance Criteria

1. WHEN a Marketing Agent views a Booked unit in dashboard or map THEN the System SHALL display "Mark as Sold" button
2. WHEN a Marketing Agent clicks "Mark as Sold" THEN the System SHALL display CRM form with fields: Nama Pembeli Final, Nomor HP Final, Email, Alamat, Tanggal Transaksi, Nominal Transaksi, Nomor SPJK, Metode Pembayaran, and Upload Bukti Pembayaran (optional)
3. WHEN a Marketing Agent submits sold form with valid data THEN the System SHALL change unit status to Sold (red) and store all CRM data
4. WHEN the System updates unit to Sold status THEN the System SHALL reflect the change in real-time on public web with red color
5. WHEN a Marketing Agent successfully marks unit as sold THEN the System SHALL display success notification and update dashboard statistics
6. WHEN a Marketing Agent views a Sold unit THEN the System SHALL display "View Transaction Details" button but NOT allow status change back to Booking or Available
7. WHEN a Marketing Agent clicks "View Transaction Details" on sold unit THEN the System SHALL display complete CRM data including booking history and transaction details
8. WHEN the System stores sold transaction THEN the System SHALL include commission calculation based on nominal transaksi for marketing performance tracking

### Requirement 7

**User Story:** Sebagai superadmin, saya ingin login ke admin dashboard untuk mengelola inventori lahan dan akun marketing, sehingga saya dapat mengupdate status unit dan mengelola tim sales secara terpusat.

#### Acceptance Criteria

1. WHEN a Superadmin accesses the admin URL THEN the System SHALL display a login page
2. WHEN a Superadmin enters valid credentials THEN the System SHALL authenticate and redirect to Dashboard Inventori
3. WHEN a Superadmin enters invalid credentials THEN the System SHALL display an error message and prevent access
4. WHEN a Superadmin successfully logs in THEN the System SHALL maintain the session until logout or timeout
5. WHEN a Superadmin accesses the dashboard THEN the System SHALL display navigation menu with options for Inventori Management and Marketing Account Management

### Requirement 8

**User Story:** Sebagai superadmin, saya ingin memilih proyek dan mencari unit tertentu dengan cepat, sehingga saya dapat langsung mengupdate status unit yang diminta marketing.

#### Acceptance Criteria

1. WHEN a Superadmin accesses Dashboard Inventori THEN the System SHALL display project selection for Borneo, Jogja, and Patuk
2. WHEN a Superadmin selects a project THEN the System SHALL load the Canvas Editor with Interactive Map for that project
3. WHEN a Superadmin uses the search function with unit number THEN the System SHALL zoom to and highlight that specific unit location
4. WHEN a Superadmin applies status filter THEN the System SHALL display only units matching the selected status (Available, Booking, or Sold)

### Requirement 9

**User Story:** Sebagai superadmin, saya ingin mengupdate status unit secara visual menggunakan Canvas Editor, sehingga saya dapat mengelola banyak unit dengan efisien.

#### Acceptance Criteria

1. WHEN a Superadmin views Canvas Editor THEN the System SHALL display the same Interactive Map as public view with additional control layers
2. WHEN a Superadmin clicks on a unit THEN the System SHALL toggle selection state for that unit
3. WHEN a Superadmin drags mouse over multiple units THEN the System SHALL select all units within the drag area (drag selection)
4. WHEN a Superadmin clicks "Select All in Row" button THEN the System SHALL select all units in that specific row
5. WHEN a Superadmin selects one or more units THEN the System SHALL display a Floating Action Menu with status change options

### Requirement 10

**User Story:** Sebagai superadmin, saya ingin mengubah status unit menjadi Available, Booking, atau Sold, sehingga status di public web selalu akurat.

#### Acceptance Criteria

1. WHEN a Superadmin selects units and clicks "Set Available" in Floating Action Menu THEN the System SHALL change selected units status to Available
2. WHEN a Superadmin selects units and clicks "Set Booking/Keep" in Floating Action Menu THEN the System SHALL display input form for marketing agent name
3. WHEN a Superadmin submits Booking status with marketing name THEN the System SHALL change selected units status to Booking and store the marketing agent name
4. WHEN a Superadmin selects units and clicks "Set Sold" in Floating Action Menu THEN the System SHALL display CRM Lite form for buyer data
5. WHEN a Superadmin submits Sold status THEN the System SHALL require Nama Pembeli, Nomor HP/WA, and Tanggal Transaksi fields
6. WHEN a Superadmin submits Sold status with complete data THEN the System SHALL change selected units status to Sold and store buyer information
7. WHEN the System updates unit status in admin THEN the System SHALL propagate changes to public web in real-time using Firebase

### Requirement 11

**User Story:** Sebagai developer, saya ingin sistem menggunakan komponen rendering yang polymorphic, sehingga satu komponen dapat menangani tiga tipe layout berbeda dengan konfigurasi yang fleksibel.

#### Acceptance Criteria

1. WHEN the System initializes MapRenderer component THEN the System SHALL accept layoutType property with values 'grid', 'linear', or 'curved'
2. WHEN MapRenderer receives layoutType 'grid' THEN the System SHALL render units using gridConfig with rows, cols, and rotation parameters
3. WHEN MapRenderer receives layoutType 'linear' THEN the System SHALL render units using horizontal flexbox or scroll layout
4. WHEN MapRenderer receives layoutType 'curved' THEN the System SHALL render units using curveConfig with arcRadius, startAngle, and endAngle parameters
5. WHEN MapRenderer renders curved layout THEN the System SHALL use SVG paths or CSS transforms to create arc positioning

### Requirement 12

**User Story:** Sebagai developer, saya ingin sistem mengoptimalkan performa rendering, sehingga peta interaktif tetap responsif di perangkat mobile dengan ratusan unit.

#### Acceptance Criteria

1. WHEN the System renders Patuk curved layout THEN the System SHALL use SVG rendering for precision and performance
2. WHEN the System renders Jogja linear layout with many units THEN the System SHALL implement virtualization or windowing technique
3. WHEN the System loads Interactive Map THEN the System SHALL render visible viewport first before loading off-screen units
4. WHEN an Investor zooms or scrolls the map THEN the System SHALL maintain smooth 60fps interaction on mobile devices

### Requirement 13

**User Story:** Sebagai investor, saya ingin melihat informasi detail unit ketika saya memilih unit tertentu, sehingga saya dapat mengetahui spesifikasi lahan sebelum booking.

#### Acceptance Criteria

1. WHEN an Investor clicks on an Available unit THEN the System SHALL display unit detail overlay or modal
2. WHEN the System displays unit detail THEN the System SHALL show unit number, luas lahan, luas unit, block name, and commodity/livestock type
3. WHEN the System displays unit detail for Jogja or Patuk THEN the System SHALL show "Luas Lahan: 33m²" and "Luas Unit: 24m²"
4. WHEN the System displays unit detail THEN the System SHALL include the booking button within the detail view

### Requirement 14

**User Story:** Sebagai sistem, saya ingin menyimpan dan mengambil data unit dari database real-time, sehingga semua pengguna melihat informasi yang konsisten dan up-to-date.

#### Acceptance Criteria

1. WHEN the System initializes THEN the System SHALL connect to Supabase database
2. WHEN the System loads a project THEN the System SHALL fetch all unit data for that project from Supabase
3. WHEN a Superadmin updates unit status THEN the System SHALL write changes to Supabase immediately
4. WHEN Supabase data changes THEN the System SHALL push updates to all connected clients in real-time using Supabase Realtime
5. WHEN the System stores unit data THEN the System SHALL include fields: unitId, projectId, blockId, status, commodity/livestockType, luasLahan, luasUnit, and optional buyerData
6. WHEN the System deploys to production THEN the System SHALL use Vercel for hosting and automatic deployments

### Requirement 15

**User Story:** Sebagai pengguna mobile, saya ingin interface yang responsif dan touch-friendly, sehingga saya dapat berinteraksi dengan peta dengan mudah di layar sentuh.

#### Acceptance Criteria

1. WHEN the System renders on mobile device THEN the System SHALL use mobile-first responsive design
2. WHEN an Investor performs pinch gesture THEN the System SHALL zoom in or out on the Interactive Map
3. WHEN an Investor performs swipe gesture THEN the System SHALL pan the Interactive Map
4. WHEN an Investor taps on a unit THEN the System SHALL register the tap with minimum 44x44px touch target
5. WHEN the System displays on screen width below 768px THEN the System SHALL optimize layout for mobile view
6. WHEN the System displays sticky footer button THEN the System SHALL ensure it does not obstruct map content

### Requirement 16

**User Story:** Sebagai superadmin, saya ingin melihat visual cues yang jelas di Canvas Editor, sehingga saya dapat dengan mudah mengidentifikasi unit yang sedang saya pilih.

#### Acceptance Criteria

1. WHEN a Superadmin selects a unit in Canvas Editor THEN the System SHALL highlight the unit with distinct border or overlay
2. WHEN a Superadmin performs drag selection THEN the System SHALL display selection rectangle during drag operation
3. WHEN a Superadmin completes drag selection THEN the System SHALL highlight all units within the selection area
4. WHEN a Superadmin hovers over a unit THEN the System SHALL show hover state with visual feedback

### Requirement 17

**User Story:** Sebagai investor, saya ingin melihat ikon visual yang membantu saya mengidentifikasi jenis komoditas atau ternak, sehingga saya tidak bingung saat melihat banyak unit.

#### Acceptance Criteria

1. WHEN the System renders units for Jogja or Patuk THEN the System SHALL display small icon of chicken or duck inside unit blocks
2. WHEN the System renders units for Borneo THEN the System SHALL display commodity name or icon within the unit
3. WHEN the System displays legend THEN the System SHALL show color coding with corresponding commodity or livestock labels

### Requirement 18

**User Story:** Sebagai superadmin, saya ingin membuat dan mengelola akun marketing agent, sehingga tim sales dapat mengakses sistem dengan kredensial yang aman.

#### Acceptance Criteria

1. WHEN a Superadmin accesses Marketing Account Management page THEN the System SHALL display list of existing marketing accounts
2. WHEN a Superadmin clicks "Create New Account" button THEN the System SHALL display form with fields: name, email, phone number, and initial password
3. WHEN a Superadmin submits new account form with valid data THEN the System SHALL create marketing account in Supabase Auth
4. WHEN a Superadmin creates new account THEN the System SHALL send email notification to the marketing agent with login credentials
5. WHEN a Superadmin views marketing account list THEN the System SHALL display account status (active/inactive), last login date, and action buttons (edit/deactivate)
6. WHEN a Superadmin clicks "Deactivate" on a marketing account THEN the System SHALL disable that account and prevent future logins
7. WHEN a Superadmin clicks "Reset Password" on a marketing account THEN the System SHALL generate new temporary password and send it via email

### Requirement 20

**User Story:** Sebagai superadmin, saya ingin membuat project baru dengan canvas editor, sehingga saya dapat menambahkan kawasan farm estate baru ke dalam sistem.

#### Acceptance Criteria

1. WHEN a Superadmin accesses Project Management page THEN the System SHALL display list of existing projects with thumbnail previews
2. WHEN a Superadmin clicks "Create New Project" button THEN the System SHALL display project creation form with fields: project name, total area, layout type (grid/linear/curved), and description
3. WHEN a Superadmin submits new project form THEN the System SHALL create empty project canvas and redirect to Canvas Editor
4. WHEN a Superadmin enters Canvas Editor for new project THEN the System SHALL display blank canvas with toolbar containing Block Element, Facility Element, and Unit Element options
5. WHEN a Superadmin drags Block Element to canvas THEN the System SHALL create a block with configurable properties: block name, color, and unit capacity
6. WHEN a Superadmin drags Facility Element to canvas THEN the System SHALL create a facility with configurable properties: facility name, icon type (Office/Warehouse/Shopping Gallery/Pos Security/Parking Area), and size
7. WHEN a Superadmin drags Unit Element to canvas THEN the System SHALL create a unit with configurable properties: unit number, luas lahan, luas unit, commodity/livestock type, and initial status
8. WHEN a Superadmin configures grid layout THEN the System SHALL provide options for rows, columns, and rotation angle
9. WHEN a Superadmin configures curved layout THEN the System SHALL provide options for arc radius, start angle, and end angle
10. WHEN a Superadmin saves project THEN the System SHALL store all elements configuration to Supabase and make project available on public web

### Requirement 21

**User Story:** Sebagai superadmin, saya ingin mengedit project yang sudah ada menggunakan canvas editor, sehingga saya dapat mengupdate layout atau menambah unit baru.

#### Acceptance Criteria

1. WHEN a Superadmin selects existing project from Project Management page THEN the System SHALL load Canvas Editor with all existing elements
2. WHEN a Superadmin clicks on any element in canvas THEN the System SHALL display properties panel for that element
3. WHEN a Superadmin modifies element properties THEN the System SHALL update the element in real-time on canvas
4. WHEN a Superadmin adds new Unit Elements to existing block THEN the System SHALL automatically assign sequential unit numbers
5. WHEN a Superadmin repositions elements on canvas THEN the System SHALL update coordinates and maintain relative positioning
6. WHEN a Superadmin saves changes THEN the System SHALL update project data in Supabase and reflect changes on public web immediately

### Requirement 22

**User Story:** Sebagai superadmin, saya ingin menghapus project yang sudah tidak digunakan, sehingga sistem tetap bersih dan terorganisir.

#### Acceptance Criteria

1. WHEN a Superadmin clicks "Delete" button on a project THEN the System SHALL display confirmation dialog with warning message
2. WHEN a Superadmin confirms project deletion THEN the System SHALL check if any units in the project have Sold status
3. WHEN a project contains units with Sold status THEN the System SHALL prevent deletion and display error message "Project tidak dapat dihapus karena memiliki unit yang sudah terjual"
4. WHEN a project contains only Available or Booking units THEN the System SHALL allow deletion after confirmation
5. WHEN a Superadmin confirms deletion of eligible project THEN the System SHALL remove project and all associated data from Supabase
6. WHEN a project is deleted THEN the System SHALL remove project from public web project selection immediately

### Requirement 23

**User Story:** Sebagai superadmin, saya ingin canvas editor yang menyediakan berbagai elemen visual, sehingga saya dapat membuat siteplan yang lengkap dan informatif.

#### Acceptance Criteria

1. WHEN a Superadmin accesses Canvas Editor toolbar THEN the System SHALL display element categories: Blocks, Facilities, Units, and Decorations
2. WHEN a Superadmin expands Blocks category THEN the System SHALL show options: Commodity Block (for Borneo) and Livestock Block (for Jogja/Patuk)
3. WHEN a Superadmin expands Facilities category THEN the System SHALL show options: Office, Warehouse, Shopping Gallery, Pos Security, Parking Area, and Custom Facility
4. WHEN a Superadmin expands Units category THEN the System SHALL show options: Standard Unit, Custom Size Unit, and Bulk Unit Generator
5. WHEN a Superadmin expands Decorations category THEN the System SHALL show options: Green Area, Road/Path, Water Feature, and Label/Text
6. WHEN a Superadmin uses Bulk Unit Generator THEN the System SHALL display form to generate multiple units with parameters: quantity, starting number, arrangement (grid/row/arc), and spacing
7. WHEN a Superadmin places Green Area decoration THEN the System SHALL allow freeform drawing or polygon shape creation
8. WHEN a Superadmin places Label/Text THEN the System SHALL provide text input, font size, color, and rotation options

### Requirement 23A

**User Story:** Sebagai superadmin, saya ingin mengupload gambar design siteplan sebagai background layer di canvas editor, sehingga saya dapat melakukan tracing dengan akurasi tinggi untuk menempatkan elemen-elemen.

#### Acceptance Criteria

1. WHEN a Superadmin accesses Canvas Editor THEN the System SHALL display "Upload Background" button in toolbar
2. WHEN a Superadmin clicks "Upload Background" THEN the System SHALL open file picker accepting image formats (JPG, PNG, SVG) with maximum size 10MB
3. WHEN a Superadmin uploads background image THEN the System SHALL display the image as bottom layer behind all elements
4. WHEN the System displays background image THEN the System SHALL provide opacity slider (0-100%) to adjust transparency for easier tracing
5. WHEN a Superadmin adjusts background opacity THEN the System SHALL update the transparency in real-time
6. WHEN a Superadmin places elements on canvas THEN the System SHALL render elements above the background layer
7. WHEN a Superadmin clicks "Toggle Background" button THEN the System SHALL show or hide the background image without deleting it
8. WHEN a Superadmin clicks "Delete Background" button THEN the System SHALL display confirmation dialog "Hapus background image? Aksi ini tidak dapat dibatalkan"
9. WHEN a Superadmin confirms background deletion THEN the System SHALL remove the image from canvas and Supabase Storage
10. WHEN a Superadmin saves project with background image THEN the System SHALL store background image URL and opacity settings in project configuration
11. WHEN a Superadmin reopens project with background THEN the System SHALL load the background image with saved opacity settings
12. WHEN the System renders public web Masterplan View THEN the System SHALL NOT display the background image (background only visible in Canvas Editor for tracing)

### Requirement 24

**User Story:** Sebagai superadmin, saya ingin membuat layout melengkung untuk project hillside seperti Patuk, sehingga siteplan dapat merepresentasikan kontur lahan terasering dengan akurat.

#### Acceptance Criteria

1. WHEN a Superadmin selects curved layout type for a project THEN the System SHALL enable arc-based unit positioning tools
2. WHEN a Superadmin uses Bulk Unit Generator with arc arrangement THEN the System SHALL display controls for arc radius, start angle, end angle, and number of units per row
3. WHEN a Superadmin generates curved row of units THEN the System SHALL position each unit along the arc path using SVG path calculations
4. WHEN a Superadmin creates multiple curved rows THEN the System SHALL allow different arc parameters for each row to simulate terracing effect
5. WHEN the System renders curved layout on public web THEN the System SHALL use SVG elements for precise curved positioning
6. WHEN a Superadmin adjusts arc radius THEN the System SHALL update all units in that row to follow the new curve in real-time
7. WHEN a Superadmin creates curved layout similar to Patuk siteplan THEN the System SHALL support overlapping curved rows with different radii to create organic hillside appearance

### Requirement 25

**User Story:** Sebagai pengguna sistem, saya ingin melihat interface yang konsisten dengan brand identity Pring Land, sehingga pengalaman visual terasa profesional dan terpercaya.

#### Acceptance Criteria

1. WHEN the System displays any page THEN the System SHALL use Pring Land logo and brand colors consistently
2. WHEN the System renders public web THEN the System SHALL use green color palette (#22C55E, #16A34A, #15803D) as primary colors representing agriculture theme
3. WHEN the System displays buttons and interactive elements THEN the System SHALL use rounded corners and soft shadows following modern design principles
4. WHEN the System shows typography THEN the System SHALL use clean sans-serif fonts (Inter or similar) for readability on mobile devices
5. WHEN the System displays siteplan background THEN the System SHALL use organic textures or subtle green gradients to represent farmland
6. WHEN the System renders unit elements THEN the System SHALL use house/building icons with agricultural aesthetic matching Pring Land brand
7. WHEN the System displays facility icons THEN the System SHALL use simple line icons with green accent colors
8. WHEN the System shows status indicators THEN the System SHALL use clear visual hierarchy: white (available), yellow (#EAB308), and red (#DC2626) with sufficient contrast
9. WHEN the System displays navigation elements THEN the System SHALL use bottom navigation bar on mobile for easy thumb access
10. WHEN the System renders canvas editor THEN the System SHALL use light background with subtle grid pattern for professional workspace feel

### Requirement 28

**User Story:** Sebagai pengguna berusia 45 tahun ke atas, saya ingin interface yang mudah dibaca dan digunakan, sehingga saya dapat berinteraksi dengan sistem tanpa kesulitan meskipun penglihatan dan kemampuan motorik saya menurun.

#### Acceptance Criteria

1. WHEN the System displays body text THEN the System SHALL use minimum font size 18px for optimal readability
2. WHEN the System displays labels and secondary text THEN the System SHALL use minimum font size 16px
3. WHEN the System displays unit numbers on siteplan THEN the System SHALL use bold font with minimum size 20px for clear visibility
4. WHEN the System displays headings THEN the System SHALL use font size minimum 24px with bold weight
5. WHEN the System renders buttons and interactive elements THEN the System SHALL use minimum touch target size 56x56px to accommodate less precise touch
6. WHEN the System displays multiple interactive elements THEN the System SHALL provide minimum spacing 16px between elements to prevent accidental taps
7. WHEN the System uses color to convey information THEN the System SHALL ensure color contrast ratio minimum 4.5:1 for normal text and 3:1 for large text (WCAG AA compliance)
8. WHEN the System displays status colors THEN the System SHALL use high contrast combinations: Available (white with dark border), Booking (yellow #EAB308 with dark text), Sold (red #DC2626 with white text)
9. WHEN the System uses background colors THEN the System SHALL avoid pure white (#FFFFFF) and use off-white (#F9FAFB) to reduce eye strain
10. WHEN the System displays text on colored backgrounds THEN the System SHALL ensure sufficient contrast for readability
11. WHEN the System provides zoom functionality THEN the System SHALL display large, clearly labeled +/- buttons (minimum 64x64px) in addition to pinch-to-zoom gesture
12. WHEN the System displays zoom controls THEN the System SHALL position them in easily reachable area (bottom-right corner) with high contrast background
13. WHEN a user double-taps on siteplan THEN the System SHALL zoom in to that location as alternative to pinch gesture
14. WHEN the System displays forms THEN the System SHALL use large input fields (minimum height 56px) with clear labels above fields
15. WHEN the System displays error messages THEN the System SHALL use large, bold text with icon indicators in addition to color
16. WHEN the System provides navigation THEN the System SHALL include text labels with icons (not icon-only) for clarity
17. WHEN the System displays bottom navigation THEN the System SHALL use minimum height 72px with icon size 32px and label text 14px
18. WHEN the System displays modal dialogs THEN the System SHALL use large, clearly separated action buttons with descriptive text (not just "OK" or "Cancel")
19. WHEN the System requires scrolling THEN the System SHALL provide large, visible scroll indicators
20. WHEN the System displays loading states THEN the System SHALL use large, clear loading indicators with descriptive text
21. WHEN the System displays information density THEN the System SHALL use generous white space and avoid cramming too much content per screen
22. WHEN the System provides breadcrumb navigation THEN the System SHALL use large, tappable breadcrumb items with clear separators
23. WHEN the System displays tables or lists THEN the System SHALL use alternating row colors and generous row height (minimum 64px) for easier scanning
24. WHEN the System uses animations or transitions THEN the System SHALL keep them slow and smooth (minimum 300ms duration) to avoid disorientation

### Requirement 26

**User Story:** Sebagai investor, saya ingin melihat semua project yang tersedia di homepage, sehingga saya dapat memilih project yang sesuai dengan kebutuhan investasi saya.

#### Acceptance Criteria

1. WHEN an Investor accesses the homepage THEN the System SHALL display all active projects created by Superadmin
2. WHEN the System displays project list THEN the System SHALL show project card with thumbnail image, project name, location, total area, total units, and available units count
3. WHEN a Superadmin creates new project and publishes it THEN the System SHALL automatically add the project to homepage project selection
4. WHEN a Superadmin deletes a project THEN the System SHALL automatically remove the project from homepage project selection
5. WHEN the System displays project cards THEN the System SHALL sort projects by creation date (newest first) or custom order set by Superadmin
6. WHEN an Investor clicks on a project card THEN the System SHALL navigate to that project's Masterplan View
7. WHEN a project has zero available units THEN the System SHALL display "Sold Out" badge on project card but still allow viewing

### Requirement 27

**User Story:** Sebagai superadmin, saya ingin mengatur visibility dan urutan project di homepage, sehingga saya dapat mengontrol project mana yang ditampilkan ke publik.

#### Acceptance Criteria

1. WHEN a Superadmin creates new project THEN the System SHALL set project status to "Draft" by default
2. WHEN a Superadmin sets project status to "Published" THEN the System SHALL make project visible on public homepage
3. WHEN a Superadmin sets project status to "Draft" or "Hidden" THEN the System SHALL hide project from public homepage but keep data intact
4. WHEN a Superadmin accesses Project Management page THEN the System SHALL display drag-and-drop interface to reorder projects
5. WHEN a Superadmin reorders projects THEN the System SHALL update display order on public homepage immediately
6. WHEN a Superadmin edits project settings THEN the System SHALL provide option to set featured project with highlighted display on homepage

### Requirement 19

**User Story:** Sebagai sistem, saya ingin menangani error dan edge cases dengan graceful, sehingga pengguna mendapat feedback yang jelas ketika terjadi masalah.

#### Acceptance Criteria

1. WHEN the System fails to connect to Supabase THEN the System SHALL display error message "Tidak dapat terhubung ke server, silakan coba lagi"
2. WHEN the System fails to load project data THEN the System SHALL display error message and retry option
3. WHEN a Superadmin attempts to update unit but network fails THEN the System SHALL queue the update and retry when connection restored
4. WHEN an Investor clicks booking button but WhatsApp is not installed THEN the System SHALL fallback to web.whatsapp.com
5. WHEN the System encounters invalid unit data THEN the System SHALL log error and skip rendering that specific unit without crashing
