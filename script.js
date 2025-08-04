// ดักจับเหตุการณ์เมื่อผู้ใช้เลือกไฟล์
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        // เรียกฟังก์ชันสำหรับประมวลผลและสร้างไฟล์ดาวน์โหลด
        processAndExportFile(fileContent);
    };

    reader.readAsText(file);
});

// ฟังก์ชันสำหรับประมวลผลและสร้างไฟล์สำหรับดาวน์โหลด
function processAndExportFile(content) {
    const lines = content.split('\n');
    let outputNumbers = '';

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') return;

        // ดึงเฉพาะตัวเลขออกมา
        const fileNumber = (trimmedLine.match(/\d+/g) || []).join('');
        
        // เพิ่มตัวเลขลงในสตริง และขึ้นบรรทัดใหม่
        if (fileNumber) {
            outputNumbers += `${fileNumber}\n`;
        }
    });

    // เรียกฟังก์ชันเพื่อสร้างและดาวน์โหลดไฟล์ใหม่
    downloadFile(outputNumbers, 'extracted_numbers.txt');
    
    // ล้างค่า input file เพื่อให้ผู้ใช้สามารถเลือกไฟล์ใหม่ได้
     document.getElementById('fileInput').value = '';
}

// ฟังก์ชันสำหรับสร้างและดาวน์โหลดไฟล์
function downloadFile(content, fileName) {
    // สร้าง Blob object จากเนื้อหาที่ต้องการ
    const blob = new Blob([content], { type: 'text/plain' });
    
    // สร้าง URL สำหรับ Blob
    const url = URL.createObjectURL(blob);
    
    // สร้าง element 'a' เพื่อใช้เป็นลิงก์ดาวน์โหลด
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    
    // คลิกที่ลิงก์เพื่อเริ่มการดาวน์โหลด
    document.body.appendChild(a);
    a.click();
    
    // ลบ element 'a' และ URL ที่สร้างขึ้นเพื่อล้างหน่วยความจำ
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}